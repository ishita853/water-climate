import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export const RECENT_YEARS_FROM = 2025

export type YearFilter = 'recent' | 'all' | number

export function yearFilterLabel(filter: YearFilter) {
  if (filter === 'recent') return `Recent (${RECENT_YEARS_FROM}–${RECENT_YEARS_FROM + 1})`
  if (filter === 'all') return 'All Years'
  return String(filter)
}

interface YearFilterDropdownProps {
  value: YearFilter
  availableYears: number[]
  onChange: (value: YearFilter) => void
}

function YearFilterDropdown({ value, availableYears, onChange }: YearFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const options: YearFilter[] = ['recent', 'all', ...availableYears]

  return (
    <div ref={containerRef} className="relative flex items-center gap-2 text-sm">
      <span className="text-stone-700 dark:text-stone-200">Year</span>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:border-teal-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-teal-500"
      >
        {yearFilterLabel(value)}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-2 max-h-64 w-48 overflow-y-auto rounded-lg border border-stone-200 bg-white py-1.5 shadow-lg dark:border-stone-800 dark:bg-stone-900">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`block w-full px-4 py-1.5 text-left text-sm font-medium transition-colors ${
                option === value
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400'
                  : 'text-stone-700 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              {yearFilterLabel(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default YearFilterDropdown
