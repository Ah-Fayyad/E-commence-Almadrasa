"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { CreditCard, Truck, MapPin, Phone, Mail, User, Lock } from "lucide-react"

const CheckoutPage = () => {
  const { t } = useTranslation()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "السعودية",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    paymentMethod: "card",
  })

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearCart()
      navigate("/order-success")
    } catch (error) {
      console.error("Error placing order:", error)
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 200 ? 0 : 25
  const tax = subtotal * 0.15
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">السلة فارغة</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">لا يمكن إتمام الطلب بسلة فارغة</p>
          <button onClick={() => navigate("/products")} className="btn-primary">
            تسوق الآن
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">إتمام الطلب</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`mr-2 rtl:mr-0 rtl:ml-2 ${
                    currentStep >= step ? "text-primary" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step === 1 && "معلومات الشحن"}
                  {step === 2 && "طريقة الدفع"}
                  {step === 3 && "مراجعة الطلب"}
                </span>
                {step < 3 && <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Truck className="mr-2 rtl:mr-0 rtl:ml-2" size={24} />
                  معلومات الشحن
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الاسم الأول
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الاسم الأخير
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                        required
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
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                        required
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
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العنوان</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 rtl:left-auto rtl:right-3 top-3 text-gray-400" size={16} />
                      <textarea
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        rows={3}
                        className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الرمز البريدي
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setCurrentStep(2)} className="btn-primary">
                    التالي
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <CreditCard className="mr-2 rtl:mr-0 rtl:ml-2" size={24} />
                  طريقة الدفع
                </h2>

                {/* Payment Methods */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentInfo.paymentMethod === "card"}
                        onChange={handlePaymentChange}
                        className="mr-3 rtl:mr-0 rtl:ml-3"
                      />
                      <CreditCard size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
                      <span>بطاقة ائتمان</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mada"
                        checked={paymentInfo.paymentMethod === "mada"}
                        onChange={handlePaymentChange}
                        className="mr-3 rtl:mr-0 rtl:ml-3"
                      />
                      <div className="w-5 h-5 bg-green-500 rounded mr-2 rtl:mr-0 rtl:ml-2"></div>
                      <span>مدى</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentInfo.paymentMethod === "cod"}
                        onChange={handlePaymentChange}
                        className="mr-3 rtl:mr-0 rtl:ml-3"
                      />
                      <Truck size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
                      <span>الدفع عند الاستلام</span>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                {(paymentInfo.paymentMethod === "card" || paymentInfo.paymentMethod === "mada") && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        رقم البطاقة
                      </label>
                      <div className="relative">
                        <CreditCard
                          className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="1234 5678 9012 3456"
                          className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          تاريخ الانتهاء
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                        <div className="relative">
                          <Lock
                            className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <input
                            type="text"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                            placeholder="123"
                            className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        اسم حامل البطاقة
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button onClick={() => setCurrentStep(1)} className="btn-secondary">
                    السابق
                  </button>
                  <button onClick={() => setCurrentStep(3)} className="btn-primary">
                    التالي
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">مراجعة الطلب</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">الكمية: {item.quantity}</p>
                      </div>
                      <div className="text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">عنوان الشحن</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                      <br />
                      {shippingInfo.address}
                      <br />
                      {shippingInfo.city}, {shippingInfo.postalCode}
                      <br />
                      {shippingInfo.phone}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">طريقة الدفع</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {paymentInfo.paymentMethod === "card" && "بطاقة ائتمان"}
                      {paymentInfo.paymentMethod === "mada" && "مدى"}
                      {paymentInfo.paymentMethod === "cod" && "الدفع عند الاستلام"}
                      {paymentInfo.cardNumber && (
                        <span className="block">**** **** **** {paymentInfo.cardNumber.slice(-4)}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setCurrentStep(2)} className="btn-secondary">
                    السابق
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "جاري المعالجة..." : "تأكيد الطلب"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">ملخص الطلب</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي ({cartItems.length} منتج)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span>{shipping === 0 ? "مجاني" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة (15%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Lock className="text-green-600" size={16} />
                  <span className="text-sm text-green-600 dark:text-green-400">معاملة آمنة ومشفرة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
