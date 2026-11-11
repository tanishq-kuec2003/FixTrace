import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// This tells Express to run the requireAuth security check 
// BEFORE allowing access to any routes in this file.
router.use(requireAuth);

// GET /api/users/me
router.get('/me', async (req: Request, res: Response): Promise<void> => {
  try {
    // Because requireAuth passed, we know req.user exists and holds our JWT payload
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        globalRole: true,
        // Fetch the user's organization data linked to their membership
        organizationMembers: {
          include: {
            organization: true
          }
        }
      }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;