import { twMerge } from 'tailwind-merge'

const PADDING_BOTTOM = 80

export function setDynamicMaxHeight(element: HTMLElement) {
  const { top: topOffset } = element.getBoundingClientRect()

  if (window.innerWidth < 768) {
    element.style.maxHeight = 'none'
    return
  }

  const elementHeightWithTopDifference = element.scrollHeight + topOffset

  if (elementHeightWithTopDifference > window.innerHeight) {
    element.style.maxHeight = `${window.innerHeight - (topOffset + PADDING_BOTTOM)}px`
    element.className = twMerge(element.className, 'pr-1')
  }
}
