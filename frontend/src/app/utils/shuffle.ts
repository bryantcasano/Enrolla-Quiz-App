export function shuffleArray<T>(array: T[], seed = Date.now()): T[] {
  let m = array.length
  const shuffled = [...array]

  const random = (() => {
    let s = seed
    return () => {
      s = Math.sin(s) * 10000
      return s - Math.floor(s)
    }
  })()

  while (m) {
    const i = Math.floor(random() * m--)
    ;[shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]]
  }
  return shuffled
}
