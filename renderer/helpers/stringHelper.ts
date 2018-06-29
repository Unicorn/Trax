export const randString = (length?: number): string  => {
    let result = ''
    let len = length || 16
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = len; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)]

    return result
}
