export function formatCurrencyRub(amount: number): string {
    try {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(amount);
    } catch {
        return `${amount} ₽`;
    }
}



