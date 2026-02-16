import jwt, { SignOptions } from 'jsonwebtoken';

// Define UserRole locally to avoid importing from server-side model
type UserRole = 'OWNER' | 'TEAM' | 'GUEST';

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name
  };

  const options: SignOptions = {
    expiresIn: '7d',
    issuer: 'oct4crypt',
    audience: 'oct4crypt-users'
  };

  return jwt.sign(payload, JWT_SECRET as string, options);
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET as string, {
      issuer: 'oct4crypt',
      audience: 'oct4crypt-users'
    }) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const createAuthCookie = (token: string): string => {
  return `auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`;
};

export const clearAuthCookie = (): string => {
  return 'auth-token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0';
};
