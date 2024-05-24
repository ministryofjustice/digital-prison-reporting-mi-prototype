const { products, domains, subDomains } = require('../../../../data/domainMapping')

/**
 * Generates tags data from request params
 *
 * @param {object} params request params
 * @param {boolean} deleteId
 * @return {{ id: string, text: string }[]} tags data
 */
const getTagsFromReq = (params, deleteId) => {
  if (deleteId) delete params.id
  if (deleteId) delete params.type
  return Object.values(params).filter(tag => tag).map(tag => {
    return { id: tag.toLowerCase(), text: tag.replaceAll('-', ' ') }
  })
}

/**
 * Generates breadcrumbs from tags data.
 * - Requirement: Last item has no hyperlink
 *
 * @param {{ id: string, text: string }[]} tags
 * @param {boolean} enableLastLink
 * @return {{ href: string, text: string }[]} the breadcrumb data
 */
const getTagBreadcrumbs = (tags, enableLastLink) => {
  let currentTagHref = '/operational-reporting/v6/catalogue/'
  const crumbs = tags.length ? [{ text: 'Catalogue', href: currentTagHref }] : []
  tags.forEach((tag, i) => {
    currentTagHref += tag.id + '/'
    const bc = {
      text: 'Tag: ' + tag.text,
      href: currentTagHref
    }
    if (i === tags.length - 1 && !enableLastLink) delete bc.href
    crumbs.push(bc)
  })
  return crumbs
}

/**
 * Creates the HTML for the Tag column in the catalogue list
 *
 * @param {*} tags
 * @param {*} url
 * @return {*}
 */
const createTagsCol = (tags, req) => {
  const originalUrl = req.originalUrl
  return tags
    .filter(tag => !originalUrl.includes(tag.slug))
    .map(t => {
      const tagHtml = `<strong class="govuk-tag dpr-tag dpr-tag--add" data-tag-slug=${t.slug} tooltip='Filter list by this tag'>${t.text}</strong>`
      if (!originalUrl.includes('/catalogue/')) {
        const href = `/operational-reporting/v6/catalogue/${t.slug}/`
        return `<a href="${href}" class="dpr-tag--link">${tagHtml}</a>`
      } else {
        return `${tagHtml}`
      }
    }).join('&nbsp;')
}

/**
 * Filters the rows by tags
 *
 * @param {*} tags
 * @param {*} definition
 * @return {*}
 */
const filterRowsByTags = (tags, definition) => {
  return definition.filter(def => {
    const defTags = def.tags.map(t => t.slug)
    const found = []
    tags.forEach(tag => {
      found.push(defTags.includes(tag.id))
    })
    return found.every(Boolean)
  })
}

const showTagsColumn = (rows) => {
  const hasTags = []
  rows.forEach(row => {
    const tagsCol = row.find(r => r.text === 'tags')
    hasTags.push(tagsCol && tagsCol.html !== '')
  })
  return hasTags.some(Boolean)
}

/**
 * Enhances the definition with the correct tag structure
 * NOTE: Not needed outside of prototype
 *
 * @param {*} definitions
 * @return {*}
 */
const addTagsToDefinition = (definitions) => {
  return definitions.map((def) => {
    const misOr = def.tags.find((t) => t === 'MIS' || t === 'ORS')
    const { product, subDomain, domain } = generateDomainDataForDefinition()
    const tagData = []
    if (misOr) tagData.push({ id: misOr.toLowerCase(), name: misOr, slug: misOr.toLowerCase() })
    return {
      ...def,
      tags: setTags([
        ...tagData,
        product,
        domain,
        subDomain
      ])
    }
  })
}

/**
 * Sets the tag definition
 * NOTE: Not needed outside of prototype
 *
 * @param {*} tags
 * @return {}
 */
const setTags = (tags) => {
  return tags.map((tag, i) => ({
    text: tag.name,
    id: tag.id,
    slug: tag.slug,
    level: i
  }))
}

/**
 * Randomly assigns a product, domain, subdomain configuration
 * NOTE: Not needed outside of prototype
 *
 * relationship:
 * - A sub domain has one domain
 * - A sub domain had one product
 * - A product has many domains
 *
 * @return {*}
 */
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

module.exports = {
  getTagsFromReq,
  getTagBreadcrumbs,
  createTagsCol,
  addTagsToDefinition,
  filterRowsByTags,
  showTagsColumn
}
