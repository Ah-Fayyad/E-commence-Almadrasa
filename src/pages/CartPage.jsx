"use client"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useCart } from "../context/CartContext"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

const CartPage = () => {
  const { t } = useTranslation()
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t("cart.empty")}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">لا توجد منتجات في سلة التسوق</p>
          <Link to="/products" className="btn-primary">
            {t("cart.continue_shopping")}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t("cart.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="card">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-primary font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">ملخص الطلب</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span>مجاني</span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة</span>
                  <span>${(getCartTotal() * 0.15).toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-bold">
                  <span>{t("cart.total")}</span>
                  <span>${(getCartTotal() * 1.15).toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout" className="w-full btn-primary mt-6 block text-center">
                {t("cart.checkout")}
              </Link>
              <Link to="/products" className="w-full btn-secondary mt-3 block text-center">
                {t("cart.continue_shopping")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
