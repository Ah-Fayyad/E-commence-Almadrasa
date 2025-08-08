"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ProductCard from "../components/ProductCard"
import { Search, Filter, Grid, List, ChevronDown, X } from "lucide-react"

const ProductsPage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("name")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })
  const [showFilters, setShowFilters] = useState(false)

  // Mock products data
  const mockProducts = [
    {
      id: "1",
      name: "لابتوب Dell XPS 13",
      price: 999,
      originalPrice: 1299,
      discount: 23,
      image: "/placeholder.svg?height=300&width=300&text=Dell+XPS+13",
      rating: 4.5,
      reviews: 128,
      category: "إلكترونيات",
      brand: "Dell",
      inStock: true,
    },
    {
      id: "2",
      name: "iPhone 15 Pro",
      price: 1199,
      image: "/placeholder.svg?height=300&width=300&text=iPhone+15+Pro",
      rating: 4.8,
      reviews: 256,
      category: "إلكترونيات",
      brand: "Apple",
      inStock: true,
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
      category: "إلكترونيات",
      brand: "Apple",
      inStock: true,
    },
    {
      id: "4",
      name: "ساعة Apple Watch Series 9",
      price: 399,
      image: "/placeholder.svg?height=300&width=300&text=Apple+Watch",
      rating: 4.7,
      reviews: 145,
      category: "إلكترونيات",
      brand: "Apple",
      inStock: true,
    },
    {
      id: "5",
      name: "كاميرا Canon EOS R5",
      price: 1899,
      image: "/placeholder.svg?height=300&width=300&text=Canon+EOS+R5",
      rating: 4.9,
      reviews: 67,
      category: "إلكترونيات",
      brand: "Canon",
      inStock: true,
    },
    {
      id: "6",
      name: "تلفزيون Samsung 55 بوصة",
      price: 799,
      originalPrice: 999,
      discount: 20,
      image: "/placeholder.svg?height=300&width=300&text=Samsung+TV",
      rating: 4.4,
      reviews: 203,
      category: "إلكترونيات",
      brand: "Samsung",
      inStock: true,
    },
    {
      id: "7",
      name: "قميص قطني رجالي",
      price: 89,
      image: "/placeholder.svg?height=300&width=300&text=Cotton+Shirt",
      rating: 4.2,
      reviews: 45,
      category: "أزياء",
      brand: "Fashion Brand",
      inStock: true,
    },
    {
      id: "8",
      name: "حذاء رياضي نايكي",
      price: 159,
      originalPrice: 199,
      discount: 20,
      image: "/placeholder.svg?height=300&width=300&text=Nike+Shoes",
      rating: 4.6,
      reviews: 178,
      category: "أزياء",
      brand: "Nike",
      inStock: false,
    },
  ]

  const categories = [
    { id: "", name: "جميع الفئات", count: mockProducts.length },
    { id: "إلكترونيات", name: "إلكترونيات", count: 6 },
    { id: "أزياء", name: "أزياء", count: 2 },
    { id: "منزل", name: "منزل وحديقة", count: 0 },
    { id: "رياضة", name: "رياضة", count: 0 },
  ]

  const brands = ["Apple", "Dell", "Samsung", "Canon", "Nike", "Fashion Brand"]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchQuery, selectedCategory, priceRange, sortBy])

  const filterProducts = () => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name, "ar")
      }
    })

    setFilteredProducts(filtered)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams(searchQuery ? { q: searchQuery } : {})
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setPriceRange({ min: 0, max: 2000 })
    setSearchParams({})
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t("nav.products")}</h1>
          <p className="text-gray-600 dark:text-gray-400">اكتشف مجموعة واسعة من المنتجات عالية الجودة</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("common.search")}
                  className="input-field pl-10 rtl:pl-4 rtl:pr-10 w-full"
                />
              </div>
            </form>

            {/* Controls */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field pr-8 rtl:pr-4 rtl:pl-8 appearance-none"
                >
                  <option value="name">ترتيب حسب الاسم</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                  <option value="rating">التقييم</option>
                </select>
                <ChevronDown
                  className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>

              {/* View Mode */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-400"}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-400"}`}
                >
                  <List size={16} />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse lg:hidden"
              >
                <Filter size={16} />
                <span>تصفية</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="card sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">تصفية النتائج</h2>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 text-sm flex items-center space-x-1 rtl:space-x-reverse"
                >
                  <X size={14} />
                  <span>مسح الكل</span>
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">الفئات</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 rtl:mr-0 rtl:ml-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">نطاق السعر</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number.parseInt(e.target.value) || 0 })}
                      className="input-field flex-1"
                      placeholder="من"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number.parseInt(e.target.value) || 2000 })}
                      className="input-field flex-1"
                      placeholder="إلى"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number.parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">العلامات التجارية</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="text-gray-700 dark:text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                عرض {filteredProducts.length} من {products.length} منتج
                {searchQuery && ` لـ "${searchQuery}"`}
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">لم يتم العثور على منتجات</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">جرب تغيير معايير البحث أو التصفية</p>
                <button onClick={clearFilters} className="btn-primary">
                  مسح جميع المرشحات
                </button>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredProducts.map((product) =>
                  viewMode === "grid" ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <div key={product.id} className="card">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            {product.category} • {product.brand}
                          </p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-lg font-bold text-primary">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="btn-primary">أضف للسلة</button>
                          <button className="btn-secondary">عرض التفاصيل</button>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                    السابق
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-2 rounded-lg ${
                        page === 1
                          ? "bg-primary text-white"
                          : "border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                    التالي
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
