"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Search, X, Clock, TrendingUp } from "lucide-react"

const SearchBar = ({ className = "" }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [trendingSearches] = useState(["لابتوب", "iPhone", "سماعات", "ساعة ذكية", "كاميرا"])
  const searchRef = useRef(null)

  // Mock suggestions - في التطبيق الحقيقي ستأتي من API
  const mockSuggestions = [
    "لابتوب Dell XPS 13",
    "لابتوب HP",
    "لابتوب Lenovo",
    "iPhone 15 Pro",
    "iPhone 14",
    "سماعات AirPods Pro",
    "سماعات Sony",
    "ساعة Apple Watch",
    "ساعة Samsung Galaxy Watch",
  ]

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Filter suggestions based on query
    if (query.length > 0) {
      const filtered = mockSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [searchQuery, ...recentSearches.filter((item) => item !== searchQuery)].slice(0, 5)

      setRecentSearches(newRecentSearches)
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))

      // Navigate to search results
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`)
      setQuery("")
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  const removeRecentSearch = (searchToRemove) => {
    const updated = recentSearches.filter((item) => item !== searchToRemove)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("common.search")}
          className="input-field pr-10 rtl:pr-4 rtl:pl-10 w-full"
        />
        <button
          onClick={() => handleSearch()}
          className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">اقتراحات البحث</h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-right rtl:text-right px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 rtl:space-x-reverse"
                  >
                    <Search size={16} className="text-gray-400" />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && query.length === 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock size={16} />
                  <span>عمليات البحث الأخيرة</span>
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  مسح الكل
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <button
                      onClick={() => handleSearch(search)}
                      className="flex-1 text-right rtl:text-right px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 rtl:space-x-reverse"
                    >
                      <Clock size={16} className="text-gray-400" />
                      <span>{search}</span>
                    </button>
                    <button
                      onClick={() => removeRecentSearch(search)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {query.length === 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2 rtl:space-x-reverse">
                <TrendingUp size={16} />
                <span>الأكثر بحثاً</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(trend)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query.length > 0 && suggestions.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400">لا توجد نتائج لـ "{query}"</p>
              <button onClick={() => handleSearch()} className="mt-2 text-primary hover:text-primary/80 text-sm">
                البحث على أي حال
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
