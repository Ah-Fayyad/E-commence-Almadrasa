import { Link } from "react-router-dom"

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${encodeURIComponent(category.name)}`} className="group block">
      <div className="card hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
          <div className="absolute bottom-2 left-2 rtl:left-auto rtl:right-2 bg-white dark:bg-dark-card px-2 py-1 rounded text-xs font-medium">
            {category.productCount} منتج
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
