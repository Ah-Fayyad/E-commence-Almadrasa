"use client"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { Heart, ShoppingCart, Star } from "lucide-react"

const ProductCard = ({ product }) => {
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300">
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
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 rtl:right-auto rtl:left-2 p-2 rounded-full transition-colors ${
              isInWishlist(product.id)
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
          >
            <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
            <span className="text-sm text-gray-500 mr-2 rtl:mr-0 rtl:ml-2">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-lg font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
