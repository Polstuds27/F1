import { useCallback, useState } from 'react'
import { photoSrcSet, photoUrl, type PhotoKey } from '../lib/photos'

type PhotoProps = {
  photo: PhotoKey
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
}

/** Responsive image that eases in once decoded, so nothing pops onto the dark page. */
export function Photo({ photo, alt, sizes = '100vw', priority = false, className = '' }: PhotoProps) {
  const [loaded, setLoaded] = useState(false)
  const checkCached = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <img
      ref={checkCached}
      src={photoUrl(photo, 1440)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`block h-full w-full object-cover transition-opacity duration-[1400ms] ease-cinema ${
        loaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  )
}
