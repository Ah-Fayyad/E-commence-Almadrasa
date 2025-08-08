"use client"

import { Link } from "react-router-dom"
import { Home, Search, ArrowLeft } from "lucide-react"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary opacity-20 mb-4">404</div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=300&width=400&text=404+Not+Found"
              alt="404 Not Found"
              className="mx-auto mb-8 max-w-md"
            />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">الصفحة غير موجودة</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة. ربما تم حذفها أو تغيير رابطها.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/" className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
            <Home size={20} />
            <span>العودة للرئيسية</span>
          </Link>
          <Link to="/products" className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse">
            <Search size={20} />
            <span>تصفح المنتجات</span>
          </Link>
        </div>

        {/* Popular Links */}
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">روابط مفيدة</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              من نحن
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              تواصل معنا
            </Link>
            <Link to="/cart" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              سلة التسوق
            </Link>
            <Link to="/wishlist" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              المفضلة
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-primary hover:text-primary/80 flex items-center space-x-2 rtl:space-x-reverse mx-auto"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            <span>العودة للصفحة السابقة</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
