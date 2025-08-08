"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useTheme } from "../context/ThemeContext"
import { Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon, Globe, ChevronDown } from "lucide-react"

const Header = () => {
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const { getCartItemsCount } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const isRTL = i18n.language === "ar"

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar"
    i18n.changeLanguage(newLang)
    document.dir = newLang === "ar" ? "rtl" : "ltr"
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    navigate("/")
  }

  return (
    <header className="bg-white dark:bg-dark-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <Globe size={16} />
              <span>{i18n.language === "ar" ? "EN" : "العربية"}</span>
            </button>
            <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-primary">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {t("common.welcome")} | {t("common.free_shipping")}
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-primary">ALMDRASA</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("common.search")}
                className="input-field pr-10 rtl:pr-4 rtl:pl-10"
              />
              <button
                type="submit"
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-600 dark:text-gray-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden md:flex text-gray-600 dark:text-gray-300 hover:text-primary">
              <Heart size={24} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-primary">
              <ShoppingCart size={24} />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="hidden md:block">{user.name}</span>
                  <ChevronDown size={16} />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  <User size={24} />
                  <span className="hidden md:block">{t("nav.login")}</span>
                </Link>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && user && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t("nav.account")}
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t("nav.orders")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t("nav.logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-8 rtl:space-x-reverse py-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium">
              {t("nav.home")}
            </Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium">
              {t("nav.products")}
            </Link>
            <Link to="/categories" className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium">
              {t("nav.categories")}
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium">
              {t("nav.about")}
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium">
              {t("nav.contact")}
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("common.search")}
                  className="input-field pr-10 rtl:pr-4 rtl:pl-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <Search size={20} />
                </button>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.home")}
                </Link>
                <Link
                  to="/products"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.products")}
                </Link>
                <Link
                  to="/wishlist"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.wishlist")}
                </Link>
                <Link
                  to="/about"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.about")}
                </Link>
                <Link
                  to="/contact"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
