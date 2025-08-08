"use client"

import { Component } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center px-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">حدث خطأ غير متوقع</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              نعتذر، حدث خطأ في التطبيق. يرجى المحاولة مرة أخرى أو تحديث الصفحة.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary flex items-center space-x-2 rtl:space-x-reverse mx-auto"
            >
              <RefreshCw size={16} />
              <span>تحديث الصفحة</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
