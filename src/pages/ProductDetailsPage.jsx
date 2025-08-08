"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import ProductCard from "../components/ProductCard"

const ProductDetailsPage = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)

  // Mock product data - في التطبيق الحقيقي ستأتي من API
  useEffect(() => {
    const mockProduct = {
      id: id,
      name: "لابتوب Dell XPS 13",
      price: 999,
      originalPrice: 1299,
      discount: 23,
      images: [
        "/placeholder.svg?height=500&width=500&text=Dell+XPS+13+Front",
        "/placeholder.svg?height=500&width=500&text=Dell+XPS+13+Side",
        "/placeholder.svg?height=500&width=500&text=Dell+XPS+13+Back",
        "/placeholder.svg?height=500&width=500&text=Dell+XPS+13+Open",
      ],
      rating: 4.5,
      reviews: 128,
      description:
        "لابتوب Dell XPS 13 بمعالج Intel Core i7 الجيل الحادي عشر، ذاكرة وصول عشوائي 16 جيجابايت، وقرص صلب SSD بسعة 512 جيجابايت. شاشة عالية الدقة 13.3 بوصة مع تقنية InfinityEdge.",
      features: [
        "معالج Intel Core i7-1165G7",
        "ذاكرة وصول عشوائي 16 جيجابايت LPDDR4x",
        "قرص صلب SSD 512 جيجابايت",
        "شاشة 13.3 بوصة FHD+ (1920x1200)",
        "كرت رسوميات Intel Iris Xe",
        "نظام التشغيل Windows 11 Home",
      ],
      specifications: {
        المعالج: "Intel Core i7-1165G7",
        الذاكرة: "16 جيجابايت LPDDR4x",
        التخزين: "512 جيجابايت SSD",
        الشاشة: "13.3 بوصة FHD+",
        الوزن: "1.2 كيلوجرام",
        البطارية: "حتى 12 ساعة",
      },
      inStock: true,
      category: "الإلكترونيات",
    }

    setTimeout(() => {
      setProduct(mockProduct)
      setLoading(false)
    }, 1000)
  }, [id])

  const relatedProducts = [
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

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المنتج غير موجود</h2>
          <Link to="/products" className="btn-primary">
            العودة للمنتجات
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary">
                الرئيسية
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary">
                  المنتجات
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500 dark:text-gray-400">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? "border-primary" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>

            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">({product.reviews} تقييم)</span>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="bg-accent text-white px-2 py-1 rounded text-sm font-medium">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">المميزات الرئيسية:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
              <span className="font-medium">الكمية:</span>
              <div className="flex items-center space-x-2 rtl:space-x-reverse border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <ShoppingCart size={20} />
                <span>{t("product.add_to_cart")}</span>
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`p-3 rounded-lg border transition-colors ${
                  isInWishlist(product.id)
                    ? "bg-red-500 text-white border-red-500"
                    : "border-gray-300 dark:border-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500"
                }`}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Truck className="text-primary" size={24} />
                <div>
                  <p className="font-medium">شحن مجاني</p>
                  <p className="text-sm text-gray-500">للطلبات أكثر من 200 ريال</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Shield className="text-primary" size={24} />
                <div>
                  <p className="font-medium">ضمان سنة</p>
                  <p className="text-sm text-gray-500">ضمان الشركة المصنعة</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <RotateCcw className="text-primary" size={24} />
                <div>
                  <p className="font-medium">إرجاع مجاني</p>
                  <p className="text-sm text-gray-500">خلال 30 يوم</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
              <button className="border-b-2 border-primary text-primary py-2 px-1 font-medium">المواصفات</button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 font-medium">
                التقييمات
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 font-medium">
                الشحن والإرجاع
              </button>
            </nav>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">المواصفات التقنية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-600 dark:text-gray-400">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">منتجات ذات صلة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
