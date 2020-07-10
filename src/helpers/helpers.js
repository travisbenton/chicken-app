export const unCamel = str => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
}

export function filterChickens (data, filters) {
  return data.map(chicken => {
    const applicableFilterKeys = Object.keys(filters)
      .filter(filter => filters[filter].length)

    if (!applicableFilterKeys.length) return chicken

    const shouldFilter = applicableFilterKeys.every(prop =>
      filters[prop].some(filter => filter === chicken[prop])
    )

    if (shouldFilter) return chicken

    return false
  }).filter(chicken => chicken)
}