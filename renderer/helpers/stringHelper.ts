export const randString = (length?: number): string  => {
    let result = ''
    let len = length || 16
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = len; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)]

    return result
}

export const formatClock = (duration: number) => {
  let hours = ('0' + Math.floor(duration / (60 * 60)).toString()).slice(-2)
  let minutes_divisor = duration % (60 * 60)
  let minutes = ('0' + Math.floor(minutes_divisor / 60).toString()).slice(-2)
  let seconds_devisor = minutes_divisor % 60
  let seconds = ('0' + Math.ceil(seconds_devisor).toString()).slice(-2)
  let formatted = `${hours}:${minutes}:${seconds}`

  return duration > 0 ? formatted : '00:00:00'
}

export const parameterize = (text: string) => {
  return text.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
}
