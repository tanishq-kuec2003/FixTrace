import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/authMiddleware';

// Custom request type to fix TypeScript errors with req.user
export interface AuthRequest extends import('express').Request {
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
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, status, serialNumber } = req.body;
    const organizationId = req.user!.organizationId;

    const asset = await prisma.asset.create({
      data: {
        name,
        description,
        status: status || 'OPERATIONAL',
        serialNumber,
        organizationId
      }
    });

    res.status(201).json(asset);
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ message: 'Failed to create asset' });
  }
});

// GET /api/assets - List all equipment for the user's organization
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const organizationId = req.user!.organizationId;

    const assets = await prisma.asset.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ message: 'Failed to fetch assets' });
  }
});

export default router;