"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../context/AuthContext"
import { User, Mail, Phone, MapPin, Lock, Package, Heart, CreditCard, Settings, LogOut } from "lucide-react"

const AccountPage = () => {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "تم التسليم",
      total: 299.99,
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "قيد الشحن",
      total: 159.99,
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "تم الإلغاء",
      total: 89.99,
      items: 1,
    },
  ]

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    // Change password logic here
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const tabs = [
    { id: "profile", label: "الملف الشخصي", icon: User },
    { id: "orders", label: "طلباتي", icon: Package },
    { id: "wishlist", label: "المفضلة", icon: Heart },
    { id: "addresses", label: "العناوين", icon: MapPin },
    { id: "payment", label: "طرق الدفع", icon: CreditCard },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "تم التسليم":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "قيد الشحن":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      case "تم الإلغاء":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <img
                  src={user?.avatar || "/placeholder.svg?height=80&width=80"}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg text-right rtl:text-right transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg text-right rtl:text-right text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={20} />
                  <span>تسجيل الخروج</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الملف الشخصي</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={isEditing ? "btn-secondary" : "btn-primary"}
                  >
                    {isEditing ? "إلغاء" : "تعديل"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الاسم الكامل
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-100 dark:disabled:bg-gray-800"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العنوان</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 rtl:left-auto rtl:right-3 top-3 text-gray-400" size={16} />
                      <textarea
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        rows={3}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-4 rtl:space-x-reverse">
                    <button onClick={() => setIsEditing(false)} className="btn-secondary">
                      إلغاء
                    </button>
                    <button onClick={handleSaveProfile} className="btn-primary">
                      حفظ التغييرات
                    </button>
                  </div>
                )}

                {/* Change Password Section */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">تغيير كلمة المرور</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        كلمة المرور الحالية
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        كلمة المرور الجديدة
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        تأكيد كلمة المرور
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button onClick={handleChangePassword} className="btn-primary">
                      تغيير كلمة المرور
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">طلباتي</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">طلب #{order.id}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ الطلب: {order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items} {order.items === 1 ? "منتج" : "منتجات"}
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <span className="font-bold text-primary">${order.total}</span>
                          <button className="text-primary hover:text-primary/80 text-sm font-medium">
                            عرض التفاصيل
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab === "wishlist" && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">المفضلة</h2>
                <p className="text-gray-600 dark:text-gray-400">قائمة المنتجات المفضلة لديك ستظهر هنا.</p>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">العناوين</h2>
                <p className="text-gray-600 dark:text-gray-400">إدارة عناوين الشحن الخاصة بك.</p>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">طرق الدفع</h2>
                <p className="text-gray-600 dark:text-gray-400">إدارة طرق الدفع المحفوظة.</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">الإعدادات</h2>
                <p className="text-gray-600 dark:text-gray-400">إعدادات الحساب والتفضيلات.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
