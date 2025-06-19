'use client'

import { useEffect, useState } from 'react'

interface TOCSection {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState('')
  const [sections, setSections] = useState<TOCSection[]>([])

  useEffect(() => {
    // Find all headings in the document
    const headings = document.querySelectorAll('h2[id], h3[id]')
    const tocSections: TOCSection[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      title: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1))
    }))
    
    setSections(tocSections)

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { 
        rootMargin: '-100px 0px -66% 0px',
        threshold: 0.1
      }
    )

    headings.forEach((heading) => {
      observer.observe(heading)
    })

    return () => observer.disconnect()
  }, [])

  if (sections.length === 0) return null

  return (
    <nav className="sticky top-8">
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold text-obsidian mb-4">Table of Contents</h3>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id} className={section.level === 3 ? 'ml-4' : ''}>
              <a
                href={`#${section.id}`}
                className={`block text-sm transition-colors hover:text-plum ${
                  activeSection === section.id
                    ? 'text-plum font-medium'
                    : 'text-gray-600'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
