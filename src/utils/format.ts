const format = {
  formatBRL: (value: number | undefined): string => {
    if (!value) return 'R$ ' + 0
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  },
}

export {
  format
}
