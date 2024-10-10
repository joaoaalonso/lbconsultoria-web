export const formatDate = (date: Date) => { 
    return (new Date(date)).toLocaleDateString('pt-BR')
}

export const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL', 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(num)
}

export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'decimal', 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(num)
}

export const formatPercentage = (num: number): string => {
    return `${num.toFixed(1).replace('.', ',')}%`
}