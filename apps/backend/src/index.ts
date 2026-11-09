import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Security and Utility Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ 
      status: 'success', 
      message: 'FixTrace API is live', 
      database: 'connected' 
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FixTrace Backend running on http://localhost:${PORT}`);
});