import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { organizationName, firstName, lastName, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Database Transaction: Create Org, User, and Membership together
    const result = await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: { name: organizationName }
      });

      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          globalRole: 'SUPER_ADMIN' // First user is the admin
        }
      });

      const member = await tx.organizationMember.create({
        data: {
          userId: user.id,
          organizationId: org.id,
          role: 'ADMIN'
        }
      });

      return { org, user, member };
    });

    res.status(201).json({ 
      message: 'Organization and Admin account created successfully',
      organizationId: result.org.id 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { organizationMembers: true }
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // For MVP, we assume the user logs into their primary organization
    const primaryMembership = user.organizationMembers[0];

    const token = jwt.sign(
      {
        userId: user.id,
        organizationId: primaryMembership.organizationId,
        globalRole: user.globalRole,
        orgRole: primaryMembership.role
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationId: primaryMembership.organizationId
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;