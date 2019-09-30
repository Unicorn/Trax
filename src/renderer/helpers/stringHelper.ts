export const randString = (length?: number): string => {
  let result = ''
  const len = length || 16
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = len; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]

  return result
}

export const parameterize = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/, '')
    .replace(/\s/g, '-')
}
