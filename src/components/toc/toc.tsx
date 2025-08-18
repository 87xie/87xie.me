'use client'

import cn from 'clsx'
import { useEffect, useState, useRef, useMemo, useTransition } from 'react'
import type { TocItem } from '@/utils/toc-parser'

type TocListProps = {
  toc: TocItem[]
}

export function Toc({ toc }: TocListProps) {
  const activeIds = useAnchorObserver(toc)
  const indicatorStyle = useMemo(() => {
    const startIndex = toc.findIndex((heading) => activeIds.includes(heading.id))
    const style = { top: '0', height: 'auto' }
    if (startIndex > -1) {
      style.top = startIndex * 1.75 + 'rem'
    }
    if (activeIds.length > 0) {
      style.height = activeIds.length * 1.75 + 'rem'
    }
    return style
  }, [toc, activeIds])

  return (
    <div>
      <p className="font-medium mb-3">
        Table of contents
      </p>
      {toc.length > 0 && (
        <div className="relative">
          <span
            style={indicatorStyle}
            className="absolute left-1 w-[1px] bg-gray-500 [transition:top_0.5s,height_0.2s_0.3s]"
          />
          <ul className="border-l ml-1 pl-3 border-gray-300">
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
  const [, startTransition] = useTransition()

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
       * If nothing is active yet, keep the previous.
       */
      if (intersectingIds.size === 0) return
      startTransition(() => setActiveIds([...intersectingIds]))
    }, { rootMargin: '84px 0px -84px' })

    for (const link of links) {
      observer.observe(link)
    }
    return () => {
      observer.disconnect()
    }
  }, [toc])

  return activeIds
}
