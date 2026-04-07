import { useState, useEffect, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { stats } from '../goiAPI';
import { xuatExcel, xuatWord } from '../utils/xuatThongKe';

const NHAN_TRANG_THAI = {
  PENDING: 'Chờ xử lý',
  COLLECTING: 'Đang thu gom',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy',
};

const MAU_BIEU_DO = ['#16a34a', '#2563eb', '#ca8a04', '#64748b', '#9333ea', '#ea580c'];

export default function ThongKe() {
  const [duLieu, setDuLieu] = useState(null);
  const [loi, setLoi] = useState(null);
  const [chuKy, setChuKy] = useState('month');
  const [dangXuat, setDangXuat] = useState(false);

  useEffect(() => {
    setLoi(null);
    stats
      .get(chuKy)
      .then(setDuLieu)
      .catch((e) => {
        setDuLieu(null);
        setLoi(e.message || 'Không tải được thống kê');
      });
  }, [chuKy]);

  const nhanChuKy = { day: 'Trong ngày', week: '7 ngày gần đây', month: '30 ngày gần đây' };

  const duLieuTrangThai = useMemo(() => {
    if (!duLieu?.byStatus) return [];
    return Object.entries(duLieu.byStatus).map(([k, v]) => ({
      ten: NHAN_TRANG_THAI[k] || k,
      soLuong: v,
    }));
  }, [duLieu]);

  const duLieuLoaiRac = useMemo(() => {
    if (!duLieu?.byWasteType?.length) return [];
    return duLieu.byWasteType.map((b) => ({
      ten: b.wasteType,
      'Số yêu cầu': b.count,
      'Khối lượng (kg)': Number(b.totalWeight) || 0,
    }));
  }, [duLieu]);

  const xuatWordNhanh = async () => {
    if (!duLieu) return;
    setDangXuat(true);
    try {
      await xuatWord(duLieu, nhanChuKy[chuKy]);
    } catch (e) {
      alert(e.message || 'Không xuất được file Word');
    } finally {
      setDangXuat(false);
    }
  };

  const xuatExcelNhanh = () => {
    if (!duLieu) return;
    try {
      xuatExcel(duLieu, nhanChuKy[chuKy]);
    } catch (e) {
      alert(e.message || 'Không xuất được file Excel');
    }
  };

  if (loi) {
    return (
      <div className="khung-form">
        <h1 className="tieu-de-trang">Thống kê và báo cáo</h1>
        <p className="khung-loi-tai" style={{ display: 'block' }}>{loi}</p>
      </div>
    );
  }

  if (!duLieu) return <div className="dang-tai">Đang tải...</div>;

  return (
    <div>
      <div className="dau-trang" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="tieu-de-trang" style={{ margin: 0 }}>Thống kê và báo cáo</h1>
        <div className="thong-ke-xuat">
          <button
            type="button"
            className="nut-phu"
            disabled={dangXuat}
            onClick={xuatExcelNhanh}
          >
            Xuất Excel (.xlsx)
          </button>
          <button
            type="button"
            className="nut-phu"
            disabled={dangXuat}
            onClick={xuatWordNhanh}
          >
            {dangXuat ? 'Đang xuất…' : 'Xuất Word (.docx)'}
          </button>
        </div>
      </div>

      <div className="bo-loc">
        {['day', 'week', 'month'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setChuKy(p)}
            className={`nut-loc ${chuKy === p ? 'nut-loc--dang-chon' : ''}`}
          >
            {p === 'day' ? 'Ngày' : p === 'week' ? 'Tuần' : 'Tháng'}
          </button>
        ))}
      </div>
      <p className="van-ban-phu" style={{ marginBottom: '1rem' }}>
        Phạm vi: {nhanChuKy[chuKy]} — từ {new Date(duLieu.startDate).toLocaleString('vi-VN')}
      </p>

      <div className="luoi-thong-ke">
        <div className="the-thong-ke">
          <p className="the-thong-ke__nhan">Tổng yêu cầu</p>
          <p className="the-thong-ke__gia-tri">{duLieu.totalRequests}</p>
        </div>
        <div className="the-thong-ke">
          <p className="the-thong-ke__nhan">Đã hoàn thành</p>
          <p className="the-thong-ke__gia-tri the-thong-ke__gia-tri--xanh">{duLieu.completedRequests}</p>
        </div>
        <div className="the-thong-ke">
          <p className="the-thong-ke__nhan">Tổng khối lượng (kg)</p>
          <p className="the-thong-ke__gia-tri">{duLieu.totalWeight || 0}</p>
        </div>
      </div>

      <div className="luoi-bieu-do">
        <div className="khung-chi-tiet khung-bieu-do">
          <h2 className="khung-luong__tieu-de">Biểu đồ theo trạng thái</h2>
          {duLieuTrangThai.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={duLieuTrangThai}
                  dataKey="soLuong"
                  nameKey="ten"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={({ ten, soLuong }) => `${ten}: ${soLuong}`}
                >
                  {duLieuTrangThai.map((_, i) => (
                    <Cell key={i} fill={MAU_BIEU_DO[i % MAU_BIEU_DO.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [v, 'Số lượng']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="van-ban-trong">Chưa có dữ liệu theo trạng thái trong khoảng thời gian đã chọn.</p>
          )}
        </div>

        <div className="khung-chi-tiet khung-bieu-do">
          <h2 className="khung-luong__tieu-de">Biểu đồ theo loại rác (đã hoàn thành)</h2>
          {duLieuLoaiRac.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={duLieuLoaiRac} margin={{ top: 8, right: 12, left: 8, bottom: 64 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ten" angle={-35} textAnchor="end" height={72} interval={0} fontSize={12} />
                <YAxis yAxisId="left" allowDecimals={false} label={{ value: 'Số yêu cầu', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" allowDecimals label={{ value: 'kg', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="Số yêu cầu" fill="#16a34a" name="Số yêu cầu" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="Khối lượng (kg)" fill="#2563eb" name="Khối lượng (kg)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="van-ban-trong">Chưa có yêu cầu hoàn thành theo loại rác trong khoảng thời gian đã chọn.</p>
          )}
        </div>
      </div>

      <div className="khung-chi-tiet">
        <h2 className="khung-luong__tieu-de">Bảng theo trạng thái</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {Object.entries(duLieu.byStatus || {}).map(([k, v]) => (
            <span key={k} className="nhan-trang-thai">
              {NHAN_TRANG_THAI[k] || k}: {v}
            </span>
          ))}
        </div>
      </div>
      {duLieu.byWasteType?.length > 0 && (
        <div className="khung-chi-tiet" style={{ marginTop: '1rem' }}>
          <h2 className="khung-luong__tieu-de">Theo loại rác</h2>
          <div className="danh-sach-thong-tin">
            {duLieu.byWasteType.map((b) => (
              <div key={b.wasteType} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                <span>{b.wasteType}</span>
                <span>{b.count} yêu cầu, {b.totalWeight} kg</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
