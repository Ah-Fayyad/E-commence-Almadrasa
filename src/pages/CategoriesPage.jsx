"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import CategoryCard from "../components/CategoryCard"
import { Grid, List } from "lucide-react"

const CategoriesPage = () => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")

  // Mock categories data
  const mockCategories = [
    {
      id: "1",
      name: "الإلكترونيات",
      description: "أحدث الأجهزة الإلكترونية والتقنية",
      image: "/placeholder.svg?height=200&width=200&text=Electronics",
      productCount: 156,
      subcategories: ["لابتوب", "هواتف", "سماعات", "كاميرات"],
    },
    {
      id: "2",
      name: "الأزياء",
      description: "ملابس عصرية للرجال والنساء",
      image: "/placeholder.svg?height=200&width=200&text=Fashion",
      productCount: 89,
      subcategories: ["ملابس رجالية", "ملابس نسائية", "أحذية", "إكسسوارات"],
    },
    {
      id: "3",
      name: "المنزل والحديقة",
      description: "كل ما تحتاجه لمنزلك وحديقتك",
      image: "/placeholder.svg?height=200&width=200&text=Home+Garden",
      productCount: 67,
      subcategories: ["أثاث", "ديكور", "أدوات المطبخ", "نباتات"],
    },
    {
      id: "4",
      name: "الرياضة واللياقة",
      description: "معدات رياضية وأدوات اللياقة البدنية",
      image: "/placeholder.svg?height=200&width=200&text=Sports",
      productCount: 45,
      subcategories: ["معدات رياضية", "ملابس رياضية", "مكملات غذائية"],
    },
    {
      id: "5",
      name: "الجمال والعناية",
      description: "منتجات العناية والجمال",
      image: "/placeholder.svg?height=200&width=200&text=Beauty",
      productCount: 78,
      subcategories: ["عناية بالبشرة", "مكياج", "عطور", "عناية بالشعر"],
    },
    {
      id: "6",
      name: "الكتب والقرطاسية",
      description: "كتب ومواد تعليمية وقرطاسية",
      image: "/placeholder.svg?height=200&width=200&text=Books",
      productCount: 123,
      subcategories: ["كتب", "قرطاسية", "مواد تعليمية"],
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories(mockCategories)
      setLoading(false)
    }, 1000)
  }, [])

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t("nav.categories")}</h1>
          <p className="text-gray-600 dark:text-gray-400">استكشف مجموعة متنوعة من الفئات والمنتجات</p>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600 dark:text-gray-400">{categories.length} فئة متاحة</p>
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
        </div>

        {/* Categories */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="card">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{category.productCount}</div>
                    <div className="text-sm text-gray-500">منتج</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesPage
