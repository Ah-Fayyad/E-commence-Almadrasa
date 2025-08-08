import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ProductCard from "../components/ProductCard"
import { ChevronRight, Truck, Shield, Headphones, RotateCcw } from "lucide-react"

const HomePage = () => {
  const { t } = useTranslation()

  // Mock data - في التطبيق الحقيقي ستأتي من API
  const featuredProducts = [
    {
      id: "1",
      name: "لابتوب Dell XPS 13",
      price: 999,
      originalPrice: 1299,
      discount: 23,
      image: "/placeholder.svg?height=300&width=300&text=Dell+XPS+13",
      rating: 4.5,
      reviews: 128,
    },
    {
      id: "2",
      name: "iPhone 15 Pro",
      price: 1199,
      image: "/placeholder.svg?height=300&width=300&text=iPhone+15+Pro",
      rating: 4.8,
      reviews: 256,
    },
    {
      id: "3",
      name: "سماعات AirPods Pro",
      price: 249,
      originalPrice: 299,
      discount: 17,
      image: "/placeholder.svg?height=300&width=300&text=AirPods+Pro",
      rating: 4.6,
      reviews: 89,
    },
    {
      id: "4",
      name: "ساعة Apple Watch Series 9",
      price: 399,
      image: "/placeholder.svg?height=300&width=300&text=Apple+Watch",
      rating: 4.7,
      reviews: 145,
    },
  ]

  const categories = [
    {
      id: "1",
      name: "الإلكترونيات",
      image: "/placeholder.svg?height=200&width=200&text=Electronics",
      count: 150,
    },
    {
      id: "2",
      name: "الأزياء",
      image: "/placeholder.svg?height=200&width=200&text=Fashion",
      count: 89,
    },
    {
      id: "3",
      name: "المنزل والحديقة",
      image: "/placeholder.svg?height=200&width=200&text=Home+Garden",
      count: 67,
    },
    {
      id: "4",
      name: "الرياضة",
      image: "/placeholder.svg?height=200&width=200&text=Sports",
      count: 45,
    },
  ]

  const features = [
    {
      icon: Truck,
      title: "شحن مجاني",
      description: "للطلبات أكثر من 200 ريال",
    },
    {
      icon: Shield,
      title: "ضمان الجودة",
      description: "منتجات أصلية 100%",
    },
    {
      icon: Headphones,
      title: "دعم 24/7",
      description: "خدمة عملاء متميزة",
    },
    {
      icon: RotateCcw,
      title: "إرجاع مجاني",
      description: "خلال 30 يوم",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("home.hero_title")}</h1>
              <p className="text-xl mb-8 opacity-90">{t("home.hero_subtitle")}</p>
              <Link
                to="/products"
                className="inline-flex items-center bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t("home.shop_now")}
                <ChevronRight size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&text=Hero+Image"
                alt="Hero"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("home.categories")}</h2>
            <p className="text-gray-600 dark:text-gray-300">اكتشف مجموعة واسعة من الفئات</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`} className="group">
                <div className="card text-center hover:shadow-lg transition-shadow">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} منتج</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("home.featured_products")}</h2>
              <p className="text-gray-600 dark:text-gray-300">أفضل المنتجات المختارة خصيصاً لك</p>
            </div>
            <Link to="/products" className="text-primary hover:text-primary/80 font-medium flex items-center">
              عرض الكل
              <ChevronRight size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">اشترك في النشرة الإخبارية</h2>
          <p className="text-xl mb-8 opacity-90">احصل على أحدث العروض والمنتجات الجديدة</p>
          <form className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="البريد الإلكتروني" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
            <button
              type="submit"
              className="bg-accent hover:bg-accent/90 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              اشتراك
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage
