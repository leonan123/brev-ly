import { useEffect, useRef } from 'react'

import type { Link } from '../_types/link'
import { setDynamicMaxHeight } from '../utils/set-dynamic-max-height'
import { LinksItem } from './links-item'

interface LinksListProps {
  links: Link[]
}

export function LinksList({ links }: LinksListProps) {
  const linksContainerRef = useRef<HTMLUListElement>(null)

  function handleResize() {
    if (linksContainerRef.current) {
      setDynamicMaxHeight(linksContainerRef.current)
    }
  }

  useEffect(() => {
    const linkContainer = linksContainerRef.current

    if (!linkContainer) {
      return
    }

    setDynamicMaxHeight(linkContainer)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ul
      className="flex flex-1 flex-col gap-3 overflow-y-auto pr-px"
      ref={linksContainerRef}
    >
      {links.map((link) => (
        <LinksItem key={link.id} link={link} />
      ))}
    </ul>
  )
}
