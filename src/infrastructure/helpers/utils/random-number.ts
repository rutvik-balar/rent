/**
 * random number
 * @param digit
 * @returns  {string}
 */
export const randomNumber = (digit: number): string => {
  const maxValue = Math.pow(10, digit)
  const randomOtp = Math.floor(Math.random() * maxValue)
  return randomOtp.toString().padStart(digit, '0')
}
