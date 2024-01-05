export function convertCentsToEuros(cents: number) {
  // Convertir les centimes en euros
  const euros = cents / 100

  // Formater le résultat en euros, avec deux chiffres après la virgule
  return formatPrice(euros)
}

export function formatPrice(price: number) {
  // Formater le résultat en euros, avec deux chiffres après la virgule
  return price.toFixed(2) + '€'
}
