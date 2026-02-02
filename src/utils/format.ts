/**
 * Formats a number as a currency string in MZN (Meticais).
 * Forcefully uses "MZN" instead of "MTn" by using a decimal formatter and appending the code.
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-MZ', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value) + ' MZN'
}
