'use client'

import { useState, useEffect } from 'react'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrollProgress(progress)
      setIsVisible(scrollTop > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCTAClick = () => {
    // You can customize this to navigate to contact form or open modal
    window.location.href = '/contact'
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
    }`}>
      <div className="bg-white rounded-lg shadow-lg border p-4 max-w-sm">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-3">
          <div 
            className="bg-purple-600 h-1 rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          Ready to achieve similar results?
        </p>
        
        <button 
          onClick={handleCTAClick}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Get Your Analysis
        </button>
      </div>
    </div>
  )
}
