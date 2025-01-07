export const isValidIp = (ip: string): boolean => {
  if (!ip.trim()) {
    return false
  }

  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/

  if (!ipRegex.test(ip)) {
    return false
  }

  const segments = ip.split('.')

  return segments.every((segment) => {
    const num = parseInt(segment)
    return num >= 0 && num <= 255
  })
}
