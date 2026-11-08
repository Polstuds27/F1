/**
 * Every photograph on the page, served through Unsplash's image CDN so each
 * viewport gets an appropriately sized AVIF/WebP. Swap an id here to re-art-direct.
 */
export const photos = {
  heroFront: { id: '1643873593867-9de48db17e0d', by: 'Philip Myrtorp' },
  frontWide: { id: '1642680096242-0f65edd6f11f', by: 'Aman Pal' },
  soloDark: { id: '1638552708183-52e302a55e15', by: 'Chethan Kanakamurthy' },
  carbonWeave: { id: '1637004732258-4b792ce8f474', by: 'Lawless Capture' },
  carbonEdge: { id: '1758563920442-280b4e7afe7a', by: 'Madeline Liu' },
  carbonCurve: { id: '1774416252804-bc4b2449bdd9', by: 'Bernd Dittrich' },
  bodywork: { id: '1670022437877-34d8d715129e', by: 'Edoardo Giudici Saraval' },
  museumWheel: { id: '1719405524179-3efd1909b2d1', by: 'Gergana Stefanova' },
  circuit: { id: '1614949194403-9602bdc14a3a', by: 'Clément Delacre' },
  panning: { id: '1699138346782-8a8b211c3da2', by: 'Isaac Maffeis' },
  rearStand: { id: '1625906819177-694f40425995', by: 'Philip Myrtorp' },
  vintageTrack: { id: '1730017474098-49f10e52294f', by: 'Abhinand Venugopal' },
  vintageCar: { id: '1745269061359-28dae5e9cfc4', by: 'Amanda Swanepoel' },
  vintageWheel: { id: '1652710445848-fa8019043b55', by: 'Valeriia Neganova' },
  tyre: { id: '1668933314437-c348b38d6836', by: 'Mykyta Kondratov' },
} as const

export type PhotoKey = keyof typeof photos

const WIDTHS = [640, 960, 1440, 1920, 2560]

export const photoUrl = (key: PhotoKey, width: number, quality = 72) =>
  `https://images.unsplash.com/photo-${photos[key].id}?auto=format&fit=crop&q=${quality}&w=${width}`

export const photoSrcSet = (key: PhotoKey) =>
  WIDTHS.map((w) => `${photoUrl(key, w)} ${w}w`).join(', ')
