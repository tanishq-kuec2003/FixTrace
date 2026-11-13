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
router.post('/', async (req: Request, res: Response) => {
  try {
    // Cast the request inside the function to keep Express signature happy
    const authReq = req as AuthRequest;
    
    const { name, status, serialNumber } = req.body;
    const organizationId = authReq.user!.organizationId;

    const asset = await prisma.asset.create({
      data: {
        name,
        status: status || 'OPERATIONAL',
        serialNumber,
        organizationId
      }
    });

    res.status(201).json(asset);
  } catch (error: any) { // Added ': any' to fix strict catch block errors
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

export default router;