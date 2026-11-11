import { GlobalRole, OrgRole } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        organizationId: string;
        globalRole: GlobalRole;
        orgRole: OrgRole;
      };
    }
  }
}