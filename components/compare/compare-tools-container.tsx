'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tool } from '@/lib/tools/types'
import { generateComparisonSlug } from '@/lib/tools/comparison-queries'

interface CompareToolsContainerProps {
  tools: Tool[]
}

export function CompareToolsContainer({ tools }: CompareToolsContainerProps) {
  const router = useRouter()
  const [selectedA, setSelectedA] = useState<string>('')
  const [selectedB, setSelectedB] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleCompare = () => {
    if (!selectedA || !selectedB) {
      setError('Please select two tools to compare')
      return
    }

    if (selectedA === selectedB) {
      setError('Please select two different tools')
      return
    }

    setError('')
    const slug = generateComparisonSlug(selectedA, selectedB)
    router.push(`/compare/${slug}`)
  }

  const availableToolsB = tools.filter((t) => t.slug !== selectedA)

  return (
    <div className="p-6 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-6">Select Two Tools to Compare</h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Tool A Select */}
        <div>
          <label htmlFor="tool-a" className="block text-sm font-medium text-foreground mb-2">
            First Tool
          </label>
          <select
            id="tool-a"
            value={selectedA}
            onChange={(e) => {
              setSelectedA(e.target.value)
              setError('')
            }}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a tool...</option>
            {tools.map((tool) => (
              <option key={tool.id} value={tool.slug}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tool B Select */}
        <div>
          <label htmlFor="tool-b" className="block text-sm font-medium text-foreground mb-2">
            Second Tool
          </label>
          <select
            id="tool-b"
            value={selectedB}
            onChange={(e) => {
              setSelectedB(e.target.value)
              setError('')
            }}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a tool...</option>
            {availableToolsB.map((tool) => (
              <option key={tool.id} value={tool.slug}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950 rounded text-red-700 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Compare Button */}
      <button
        onClick={handleCompare}
        disabled={!selectedA || !selectedB}
        className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Compare Tools
      </button>
    </div>
  )
}
