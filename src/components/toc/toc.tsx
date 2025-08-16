'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import cn from 'clsx'
import type { TocItem } from '@/utils/toc-parser'

type TocListProps = {
  toc: TocItem[]
}

export function Toc({ toc }: TocListProps) {
  const activeIds = useAnchorObserver(toc)
  const indicatorMeta = useMemo(() => {
    const startIndex = toc.findIndex((heading) => activeIds.includes(heading.id))
    return {
      position: `${Math.max(startIndex, 0) * 1.75}rem`,
      height: `${activeIds.length * 1.75}rem`,
    }
  }, [toc, activeIds])

  return (
    <div>
      <p className="font-medium mb-3">
        Table of contents
      </p>
      {toc.length > 0 && (
        <div className="relative">
          <span
            className="absolute left-2.5 w-[2px] bg-gray-500 transition-[height_top] duration-300"
            style={{
              top: indicatorMeta.position,
              height: indicatorMeta.height,
            }}
          />
          <ul className="border-l ml-2.5 pl-3 border-gray-300">
            {toc.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={cn(
                    'inline-block w-full py-1 link-gray text-sm',
                    activeIds.includes(heading.id) && 'link-active',
                    heading.level === 3 && 'pl-3',
                  )}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {toc.length === 0 && (
        <p className="text-sm text-gray-500">No headings found</p>
      )}
    </div>
  )
}

function useAnchorObserver(toc: TocItem[]) {
  const [activeIds, setActiveIds] = useState<string[]>([])
  const intersectingIdsRef = useRef(new Set<string>())

  useEffect(() => {
    if (toc.length === 0) return
    const links = toc.map((heading) => document.getElementById(heading.id)!)
    const observer = new IntersectionObserver((entries) => {
      const intersectingIds = intersectingIdsRef.current
      for (const entry of entries) {
        const id = entry.target.id
        if (entry.isIntersecting) {
          intersectingIds.add(id)
        } else {
          intersectingIds.delete(id)
        }
      }
      /**
       * In a large section (e.g. between <h2> and the next <h2>), the heading itself has already scrolled far above the viewport.
       * If nothing is active yet, fallback to the last seen heading.
       */
      if (intersectingIds.size === 0) {
        setActiveIds((prev) => prev.slice(-1))
        return
      }
      setActiveIds([...intersectingIds])
    }, { rootMargin: '64px 0px -84px' })

    for (const link of links) {
      observer.observe(link)
    }
    return () => {
      observer.disconnect()
    }
  }, [toc])

  return activeIds
}
