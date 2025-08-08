"use client"

import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

const WishlistPage = () => {
  const { t } = useTranslation()
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t("wishlist.empty")}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">لا توجد منتجات في قائمة المفضلة</p>
          <Link to="/products" className="btn-primary">
            تصفح المنتجات
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("nav.wishlist")}</h1>
          <span className="text-gray-600 dark:text-gray-400">
            {wishlistItems.length} {wishlistItems.length === 1 ? "منتج" : "منتجات"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="card group hover:shadow-lg transition-shadow duration-300">
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 bg-accent text-white px-2 py-1 rounded text-sm font-medium">
                      -{product.discount}%
                    </div>
                  )}
                </div>
              </Link>

              <div className="space-y-3">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>

                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <ShoppingCart size={16} />
                    <span>أضف للسلة</span>
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="p-2 border border-red-300 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                    title="حذف من المفضلة"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link to="/products" className="btn-secondary">
            متابعة التسوق
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
