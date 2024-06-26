const { products, domains, subDomains } = require('../../../data/domainMapping')

const sanitizeStringIds = (str) => {
  return str.replaceAll(' ', '-').replaceAll('/', '-').replaceAll('<', '')
    .replaceAll('(', '').replaceAll(')', '').toLowerCase()
}

const relatedArraySize = 3

const tagColors = [
  'govuk-tag--turquoise',
  'govuk-tag--pink',
  'govuk-tag--yellow'
]

const setTags = (tags) => {
  return tags.map((tag, i) => ({
    text: tag,
    id: sanitizeStringIds(tag),
    level: i,
    class: tagColors[i]
  }))
}

const enhancedDefinitions = (definitions) => {
  return definitions.map((def, index) => {
    const { product, subDomain, domain } = generateDomainDataForDefinition()

    return {
      ...def,
      id: sanitizeStringIds(def.name),
      tags: setTags(def.tags),
      subDomain,
      domain,
      product
    }
  })
}

const generateDomainDataForDefinition = () => {
  const productId = Math.floor(Math.random() * products.length)
  const product = products.find(p => p.id === productId)
  const subDomainId = Math.floor(Math.random() * product.subDomains.length)
  const subDomain = subDomains.find(sub => sub.id === subDomainId)
  const domain = domains.find(dom => dom.id === subDomain.parentId)
  return {
    product,
    subDomain,
    domain
  }
}

const getRelatedByTags = ({ tag, duplicates, definition }) => {
  duplicates = duplicates ? duplicates.map((d) => d.text) : []
  return definition
    .filter((r) => {
      const matched = r.tags.filter((t) => {
        return t.text === tag
      })
      return matched.length
    })
    .map((r) => {
      return { text: r.name, href: `./${r.id}`, description: 'A description' }
    })
    .filter((r) => {
      return !duplicates.includes(r.text)
    })
    .slice(0, relatedArraySize)
}

const getRelatedProducts = (reportData, definition, filterIndex) => {
  const { product, subDomain, domain } = reportData
  const filters = [
    // 1. same sub domain - different product
    (def) => def.subDomain.id === subDomain.id && def.product.id !== product.id,
    // 2. same domain - differenr sub domain
    (def) => def.domain === domain && def.subDomain.id !== subDomain.id,
    // 3. same product
    (def) => def.product.id === product.id
  ]
  return definition
    .filter(filters[filterIndex])
    .map((r) => {
      return { text: r.name, href: `./${r.id}`, description: 'A description', domains: [r.domain, r.subDomain.name, r.product.name] }
    })
    .slice(0, relatedArraySize)
}

const createTagsCol = (tags, url) => {
  return tags.map(t => {
    let tagHtml = `<strong class="govuk-tag ${t.class}">${t.text}</strong>`
    if (!url.includes(t.id)) tagHtml = `<a href="${url}${t.id}/">${tagHtml}</a>`
    return tagHtml
  }).join('&nbsp;')
}

const createProducCol = (product, url) => {
  let productHtml = `<strong class="govuk-tag">${product.name}</strong>`
  if (!url.includes(product.slug)) productHtml = `<a href="${url}${product.slug}/">${productHtml}</a>`
  return productHtml
}

const createRows = (enhancedDefinitionsArray, url) => {
  return enhancedDefinitionsArray.map((d, index) => ([
    { html: '<a href="./report/' + d.id + '">' + d.name + '</a>' },
    { html: createTagsCol(d.tags, url) },
    // { html: createTaggedCol(d.subDomain.name) },  - leaving commented for easy debugging
    // { html: createTaggedCol(d.domain) },
    { html: createProducCol(d.product, url) }
  ]))
}

const createHead = () => {
  return [
    { text: 'Name' },
    { text: 'Tags' },
    // { text: 'Sub Domain ' }, - leaving commented for easy debugging
    // { text: 'Domain ' }
    { text: 'Product ' }
  ]
}

module.exports = {
  enhancedDefinitions,
  getRelatedByTags,
  getRelatedProducts,
  createRows,
  createHead
}
