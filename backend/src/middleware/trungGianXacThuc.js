import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Chưa đăng nhập' });
  const secret = process.env.JWT_SECRET || 'fallback-secret';
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Không có quyền thực hiện' });
    }
    next();
  };
}

export async function attachUser(req, res, next) {
  if (!req.userId) return next();
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, fullName: true, role: true, isLocked: true, points: true },
    });
    if (!user || user.isLocked) {
      return res.status(401).json({ error: 'Tài khoản bị khóa' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
