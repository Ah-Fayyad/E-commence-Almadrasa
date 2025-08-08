"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"

const ContactPage = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "العنوان",
      details: ["الرياض، المملكة العربية السعودية", "حي الملك فهد، طريق الملك عبدالعزيز"],
    },
    {
      icon: Phone,
      title: "الهاتف",
      details: ["+966 11 123 4567", "+966 50 123 4567"],
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: ["info@almdrasa.com", "support@almdrasa.com"],
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["الأحد - الخميس: 9:00 ص - 6:00 م", "الجمعة - السبت: 10:00 ص - 4:00 م"],
    },
  ]

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "الدردشة المباشرة",
      description: "تحدث مع فريق الدعم مباشرة",
      action: "ابدأ المحادثة",
      available: true,
    },
    {
      icon: Phone,
      title: "المكالمة الهاتفية",
      description: "اتصل بنا للحصول على مساعدة فورية",
      action: "اتصل الآن",
      available: true,
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      description: "أرسل استفسارك وسنرد خلال 24 ساعة",
      action: "أرسل رسالة",
      available: true,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("nav.contact")}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            نحن هنا لمساعدتك! تواصل معنا في أي وقت
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">معلومات التواصل</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 dark:text-gray-400">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">موقعنا على الخريطة</h3>
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">خريطة تفاعلية</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">أرسل لنا رسالة</h2>

              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg mb-6">
                  تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+966 50 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الموضوع *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">اختر الموضوع</option>
                      <option value="general">استفسار عام</option>
                      <option value="order">استفسار عن طلب</option>
                      <option value="product">استفسار عن منتج</option>
                      <option value="technical">مشكلة تقنية</option>
                      <option value="complaint">شكوى</option>
                      <option value="suggestion">اقتراح</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الرسالة *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <Send size={20} />
                  <span>{loading ? "جاري الإرسال..." : "إرسال الرسالة"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">طرق أخرى للتواصل</h2>
            <p className="text-gray-600 dark:text-gray-300">اختر الطريقة الأنسب لك للحصول على المساعدة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <option.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{option.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{option.description}</p>
                <button
                  className={`btn-primary w-full ${!option.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!option.available}
                >
                  {option.action}
                </button>
                {option.available && (
                  <div className="flex items-center justify-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                    <span className="text-sm text-green-600 dark:text-green-400">متاح الآن</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">الأسئلة الشائعة</h2>
            <p className="text-gray-600 dark:text-gray-300">إجابات على أكثر الأسئلة شيوعاً</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "كم يستغرق وقت الشحن؟",
                answer: "عادة ما يستغرق الشحن من 2-5 أيام عمل داخل المملكة العربية السعودية.",
              },
              {
                question: "هل يمكنني إرجاع المنتج؟",
                answer: "نعم، يمكنك إرجاع المنتج خلال 30 يوم من تاريخ الاستلام بشرط أن يكون في حالته الأصلية.",
              },
              {
                question: "ما هي طرق الدفع المتاحة؟",
                answer: "نقبل الدفع بالبطاقات الائتمانية، مدى، والدفع عند الاستلام.",
              },
              {
                question: "هل المنتجات أصلية؟",
                answer: "نعم، جميع منتجاتنا أصلية 100% ونقدم ضمان الشركة المصنعة.",
              },
            ].map((faq, index) => (
              <div key={index} className="card">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
