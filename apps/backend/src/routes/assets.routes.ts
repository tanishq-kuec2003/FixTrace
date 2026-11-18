import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/authMiddleware';

// Custom request type
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    organizationId: string;
    role: string;
  };
}

const router = Router();
const prisma = new PrismaClient();

// Lock down all routes in this file
router.use(requireAuth);

// POST /api/assets - Create a new piece of equipment
// POST /api/assets - Create a new piece of equipment
router.post('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    
    // 1. Extract 'category' from the request body
    const { name, status, serialNumber, category } = req.body; 
    const organizationId = authReq.user!.organizationId;

    const asset = await prisma.asset.create({
      data: {
        name,
        status: status || 'OPERATIONAL',
        serialNumber,
        // 2. Add category to the database payload (with a safe fallback)
        category: category || 'UNCATEGORIZED',
        organizationId
      }
    });

    res.status(201).json(asset);
  } catch (error: any) {
    console.error('Error creating asset:', error);
    res.status(500).json({ message: 'Failed to create asset' });
  }
});

// GET /api/assets - List all equipment for the user's organization
router.get('/', async (req: Request, res: Response) => {
  try {
    // Cast the request inside the function to keep Express signature happy
    const authReq = req as AuthRequest;
    const organizationId = authReq.user!.organizationId;

    const assets = await prisma.asset.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(assets);
  } catch (error: any) { // Added ': any' to fix strict catch block errors
    console.error('Error fetching assets:', error);
    res.status(500).json({ message: 'Failed to fetch assets' });
  }
});

// DELETE /api/assets/:id - Delete an asset securely
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const assetId = req.params.id;
    const organizationId = authReq.user!.organizationId;

    // 1. Verify the asset exists AND belongs to the user's organization
    const existingAsset = await prisma.asset.findFirst({
      where: { 
        id: assetId, 
        organizationId: organizationId 
      }
    });

    if (!existingAsset) {
      res.status(404).json({ message: 'Asset not found or unauthorized' });
      return;
    }

    // 2. Delete it
    await prisma.asset.delete({
      where: { id: assetId }
    });

    res.json({ message: 'Asset deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ message: 'Failed to delete asset' });
  }
});

// PUT /api/assets/:id - Update an existing asset
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const assetId = req.params.id;
    const organizationId = authReq.user!.organizationId;
    const { name, status, serialNumber, category } = req.body;

    // 1. Verify the asset exists and belongs to the user's organization
    const existingAsset = await prisma.asset.findFirst({
      where: { id: assetId, organizationId }
    });

    if (!existingAsset) {
      res.status(404).json({ message: 'Asset not found or unauthorized' });
      return;
    }

    // 2. Update the fields
    const updatedAsset = await prisma.asset.update({
      where: { id: assetId },
      data: {
        name,
        status,
        serialNumber,
        category
      }
    });

    res.json(updatedAsset);
  } catch (error: any) {
    console.error('Error updating asset:', error);
    res.status(500).json({ message: 'Failed to update asset' });
  }
});

export default router;