export const { format: formatNumberWithOneDigit } = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
})