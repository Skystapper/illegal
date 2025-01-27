'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import Fuse from 'fuse.js'

interface SearchItem {
  class: number
  title: string
  description: string
}

// Import from the data file instead
import { goodsClasses, servicesClasses } from '@/app/services/trademark/classes/data'

// Create a new array from the imported data
const searchData: SearchItem[] = [
  ...Object.values(goodsClasses),
  ...Object.values(servicesClasses)
].map(item => ({
  class: item.class,
  title: item.title,
  description: item.description
}))

// Modified Fuse options for more sensitive searching
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.5 },     // Equal weight for both
    { name: 'description', weight: 0.5 } // title and description
  ],
  isCaseSensitive: false,
  minMatchCharLength: 2,    // Match even 2-letter words
  threshold: 0.3,          // Lower threshold means more liberal matching
  distance: 500,           // Increased distance for better partial matches
  includeScore: true,
  findAllMatches: true,    // Find all possible matches
  ignoreLocation: true,    // Ignore where in the text the match is found
  useExtendedSearch: true  // Enable advanced search patterns
}

const fuse = new Fuse(searchData, fuseOptions)

export default function SearchBox({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Fuse.FuseResult<SearchItem>[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.length >= 2) { // Reduced minimum length to 2 characters
      const searchResults = fuse.search(value)
      setResults(searchResults)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }

  const handleResultClick = (classNumber: number) => {
    // Close the search dropdown
    setIsOpen(false)
    setQuery('')
    onClose?.()

    // Store the target class in sessionStorage
    sessionStorage.setItem('scrollToClass', classNumber.toString())

    // Check if we're already on the classes page
    if (window.location.pathname === '/services/trademark/classes') {
      // If on the same page, just scroll
      scrollToClass(classNumber)
    } else {
      // If on a different page, navigate first
      router.push('/services/trademark/classes')
    }
  }

  const scrollToClass = (classNumber: number) => {
    const element = document.getElementById(`class-${classNumber}`)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
      
      element.classList.add('highlight-class')
      setTimeout(() => {
        element.classList.remove('highlight-class')
      }, 2000)
    }
  }

  // Add effect to handle scroll after navigation
  useEffect(() => {
    const storedClass = sessionStorage.getItem('scrollToClass')
    if (storedClass) {
      // Clear the stored class immediately to prevent unwanted scrolls
      sessionStorage.removeItem('scrollToClass')
      
      // Add a small delay to ensure the page is fully loaded
      setTimeout(() => {
        scrollToClass(parseInt(storedClass))
      }, 100)
    }
  }, [])

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search trademark classes (e.g., 'chemicals', 'medical', 'software')"
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border 
                   border-gray-300 rounded-lg focus:outline-none focus:border-burgundy-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              setIsOpen(false)
            }}
            className="absolute right-3 top-2.5"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200">
          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.item.class)}
                  className="w-full px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 text-left"
                >
                  <div className="flex items-start">
                    <div className="text-burgundy-600 font-semibold mr-3">
                      Class {result.item.class}
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">
                        {result.item.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {result.item.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No matching trademark classes found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
} 