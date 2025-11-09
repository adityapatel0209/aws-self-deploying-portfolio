import { useEffect, useState, type RefObject } from "react"

interface UseIntersectionObserverProps {
  ref: RefObject<Element>
  threshold?: number | number[]
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  ref,
  threshold = 0,
  rootMargin = "0px",
  freezeOnceVisible = false,
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIsIntersecting(entry.isIntersecting)

        if (entry.isIntersecting && freezeOnceVisible) {
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, threshold, rootMargin, freezeOnceVisible])

  return isIntersecting
} 