import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, requireRole } from '../middleware/trungGianXacThuc.js';

const router = Router();
const prisma = new PrismaClient();

// Staff/Admin: Thống kê
router.get('/', authMiddleware, requireRole('STAFF', 'ADMIN'), async (req, res) => {
  const { period } = req.query;

  const now = new Date();
  let startDate = new Date(now);
  if (period === 'day') {
    startDate.setHours(0, 0, 0, 0);
  } else if (period === 'week') {
    startDate.setDate(startDate.getDate() - 7);
  } else {
    startDate.setMonth(startDate.getMonth() - 1);
  }

  const [totalRequests, completedRequests, byStatus, byWasteType] = await Promise.all([
    prisma.collectionRequest.count({ where: { createdAt: { gte: startDate } } }),
    prisma.collectionRequest.count({
      where: { status: 'COMPLETED', completedAt: { gte: startDate } },
    }),
    prisma.collectionRequest.groupBy({
      by: ['status'],
      where: { createdAt: { gte: startDate } },
      _count: true,
    }),
    prisma.collectionRequest.groupBy({
      by: ['wasteTypeId'],
      where: { status: 'COMPLETED', completedAt: { gte: startDate } },
      _sum: { verifiedWeight: true, quantity: true },
      _count: true,
    }),
  ]);

  const wasteTypeIds = [...new Set(byWasteType.map((b) => b.wasteTypeId))];
  const wasteTypes = await prisma.wasteType.findMany({
    where: { id: { in: wasteTypeIds } },
  });
  const wasteMap = Object.fromEntries(wasteTypes.map((wt) => [wt.id, wt]));

  const byWasteTypeDetail = byWasteType.map((b) => ({
    wasteType: wasteMap[b.wasteTypeId]?.name || 'Khác',
    count: b._count,
    totalWeight: (b._sum.verifiedWeight ?? b._sum.quantity ?? 0),
  }));

  const totalWeight = (await prisma.collectionRequest.aggregate({
    where: { status: 'COMPLETED', completedAt: { gte: startDate } },
    _sum: { verifiedWeight: true },
  }))._sum.verifiedWeight ?? 0;

  res.json({
    period: period || 'month',
    startDate,
    totalRequests,
    completedRequests,
    totalWeight,
    byStatus: Object.fromEntries(byStatus.map((s) => [s.status, s._count])),
    byWasteType: byWasteTypeDetail,
  });
});

export default router;
