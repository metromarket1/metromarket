import React, { useState, useEffect } from 'react';
import { 
  loginUser, 
  logoutUser, 
  subscribeToAuth, 
  getOrders, 
  subscribeToMenuAvailability, 
  updateMenuItemAvailability 
} from '../services/firebase';
import { OrderData, MenuAvailability } from '../types';
import { MENU_DATA } from '../constants';
import { User } from 'firebase/auth';

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  
  // Data
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [availability, setAvailability] = useState<MenuAvailability>({});
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToAuth((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrders();
      const unsubMenu = subscribeToMenuAvailability((data) => {
        setAvailability(data);
      });
      return () => unsubMenu();
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(email, password);
    } catch (err: any) {
      setError('فشل تسجيل الدخول: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  const toggleItemAvailability = async (itemName: string, currentStatus: boolean) => {
    // If currentStatus is true (available), we want to make it false (unavailable)
    // If undefined, it's available by default, so we make it false
    const newStatus = currentStatus === false ? true : false;
    
    try {
      await updateMenuItemAvailability(itemName, newStatus);
    } catch (error: any) {
      console.error("Failed to update availability:", error);
      alert(`فشل تحديث الحالة: ${error.message || error}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">تسجيل الدخول للوحة التحكم</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">كلمة المرور</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                required 
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white" dir="rtl">
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">لوحة التحكم - Metro Market</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden md:inline">{user.email}</span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              تسجيل خروج
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-1">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 font-medium transition ${activeTab === 'orders' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
          >
            الطلبات
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`pb-3 px-4 font-medium transition ${activeTab === 'menu' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
          >
            إدارة القائمة
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">سجل الطلبات</h2>
              <button onClick={fetchOrders} className="text-primary hover:underline text-sm">تحديث</button>
            </div>
            
            {loading ? (
              <p>جاري التحميل...</p>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                    <tr>
                      <th className="p-4">التاريخ</th>
                      <th className="p-4">الاسم</th>
                      <th className="p-4">الشركة</th>
                      <th className="p-4">الهاتف</th>
                      <th className="p-4">وقت التوصيل</th>
                      <th className="p-4">الطلبات</th>
                      <th className="p-4">المجموع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {orders.map((order) => (
                      <tr key={order.id || Math.random()} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="p-4 text-sm whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleString('ar-EG')}
                        </td>
                        <td className="p-4 font-medium">{order.name}</td>
                        <td className="p-4 text-sm">{order.company}</td>
                        <td className="p-4 text-sm" dir="ltr">{order.phone}</td>
                        <td className="p-4 text-sm">{order.deliveryTime}</td>
                        <td className="p-4 text-sm">
                          <ul className="list-disc list-inside">
                            {order.orders.map((item, idx) => (
                              <li key={idx}>
                                {item.qty}x {item.order} 
                                {item.notes && item.notes !== 'لا توجد' && <span className="text-xs text-gray-500 mr-1">({item.notes})</span>}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4 font-bold text-primary">{order.total} ₪</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <p className="p-8 text-center text-gray-500">لا توجد طلبات حتى الآن</p>}
              </div>
            )}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">إدارة توفر الوجبات</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">قم بإلغاء تفعيل الوجبات التي نفذت من المخزون لإخفائها أو تعطيلها في القائمة.</p>
              </div>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="بحث عن وجبة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <span className="material-icons-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MENU_DATA.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => {
                const isAvailable = availability[item.name] !== false; // Default true
                return (
                  <div key={item.name} className={`p-4 rounded-xl border ${isAvailable ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'} flex justify-between items-center shadow-sm`}>
                    <div>
                      <h3 className={`font-bold ${!isAvailable && 'text-gray-500 line-through'}`}>{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <button
                      onClick={() => toggleItemAvailability(item.name, isAvailable)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer select-none ${
                        isAvailable 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {isAvailable ? 'متوفر' : 'غير متوفر'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
