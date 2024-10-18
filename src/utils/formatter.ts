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

export const formatDocument = (document: string): string => {
    if (document.length > 11) {
        // CNPJ
        return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    } else {
        // CPF
        return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
}

export const formatPhone = (document: string): string => {
    console.log(document.length)
    if (document.length > 10) {
        // CELLPHONE
        return document.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
        // PHONE
        return document.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
}