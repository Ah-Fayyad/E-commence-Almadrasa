"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
} from "lucide-react"

const AdminDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = [
    { title: "إجمالي المبيعات", value: "125,430 ريال", change: "+12%", icon: TrendingUp, color: "text-green-600" },
    { title: "الطلبات", value: "1,234", change: "+8%", icon: ShoppingCart, color: "text-blue-600" },
    { title: "المنتجات", value: "456", change: "+3%", icon: Package, color: "text-purple-600" },
    { title: "العملاء", value: "2,890", change: "+15%", icon: Users, color: "text-orange-600" },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "أحمد محمد", total: 299.99, status: "مكتمل", date: "2024-01-15" },
    { id: "ORD-002", customer: "فاطمة أحمد", total: 159.99, status: "قيد المعالجة", date: "2024-01-15" },
    { id: "ORD-003", customer: "محمد علي", total: 89.99, status: "ملغي", date: "2024-01-14" },
    { id: "ORD-004", customer: "نورا سالم", total: 199.99, status: "مشحون", date: "2024-01-14" },
  ]

  const products = [
    { id: 1, name: "لابتوب Dell XPS 13", price: 999, stock: 25, category: "إلكترونيات", status: "نشط" },
    { id: 2, name: "iPhone 15 Pro", price: 1199, stock: 15, category: "إلكترونيات", status: "نشط" },
    { id: 3, name: "سماعات AirPods Pro", price: 249, stock: 0, category: "إلكترونيات", status: "نفد المخزون" },
    { id: 4, name: "ساعة Apple Watch", price: 399, stock: 8, category: "إلكترونيات", status: "نشط" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "قيد المعالجة":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "مشحون":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "ملغي":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getProductStatusColor = (status) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "نفد المخزون":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "متوقف":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  // Check if user is admin (in real app, this would be from backend)
  if (!user || user.email !== "admin@almdrasa.com") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">غير مصرح لك بالوصول</h2>
          <p className="text-gray-600 dark:text-gray-400">هذه الصفحة مخصصة للمديرين فقط</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">لوحة التحكم</h1>
          <p className="text-gray-600 dark:text-gray-400">مرحباً {user.name}، إليك نظرة عامة على متجرك</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change} من الشهر الماضي</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
              {[
                { id: "overview", label: "نظرة عامة" },
                { id: "orders", label: "الطلبات" },
                { id: "products", label: "المنتجات" },
                { id: "customers", label: "العملاء" },
                { id: "analytics", label: "التحليلات" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">الطلبات الأخيرة</h2>
                <button className="text-primary hover:text-primary/80 text-sm font-medium">عرض الكل</button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900 dark:text-white">{order.total} ريال</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">إجراءات سريعة</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Plus className="text-primary mb-2" size={24} />
                  <p className="font-medium text-gray-900 dark:text-white">إضافة منتج</p>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <BarChart3 className="text-primary mb-2" size={24} />
                  <p className="font-medium text-gray-900 dark:text-white">التقارير</p>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Users className="text-primary mb-2" size={24} />
                  <p className="font-medium text-gray-900 dark:text-white">إدارة العملاء</p>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Download className="text-primary mb-2" size={24} />
                  <p className="font-medium text-gray-900 dark:text-white">تصدير البيانات</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">إدارة الطلبات</h2>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <div className="relative">
                  <Search
                    className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="البحث في الطلبات..."
                    className="input-field pl-10 rtl:pl-4 rtl:pr-10 w-64"
                  />
                </div>
                <button className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse">
                  <Filter size={16} />
                  <span>تصفية</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      رقم الطلب
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      العميل
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      المبلغ
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      الحالة
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      التاريخ
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.customer}</td>
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{order.total} ريال</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">إدارة المنتجات</h2>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                  <Plus size={16} />
                  <span>إضافة منتج</span>
                </button>
                <div className="relative">
                  <Search
                    className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="البحث في المنتجات..."
                    className="input-field pl-10 rtl:pl-4 rtl:pr-10 w-64"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      المنتج
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      السعر
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      المخزون
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      الفئة
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      الحالة
                    </th>
                    <th className="text-right rtl:text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{product.name}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.price} ريال</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.stock}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.category}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getProductStatusColor(product.status)}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">إدارة العملاء</h2>
            <p className="text-gray-600 dark:text-gray-400">قائمة العملاء وإحصائياتهم ستظهر هنا.</p>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">التحليلات والتقارير</h2>
            <p className="text-gray-600 dark:text-gray-400">الرسوم البيانية والتحليلات التفصيلية ستظهر هنا.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
