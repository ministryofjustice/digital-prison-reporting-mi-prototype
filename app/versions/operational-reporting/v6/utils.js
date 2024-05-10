/**
 * Generates tags data from request params
 *
 * @param {object} params request params
 * @param {boolean} deleteId
 * @return {{ id: string, text: string }[]} tags data   
 */
const getTagsFromReq = (params, deleteId) => {
  if (deleteId) delete params.id
  return Object.values(params).filter(tag => tag).map(tag => {
    return { id: tag.toLowerCase(), text: tag.replaceAll('-', ' ') }
  })
}

/**
 * Generates breadcrumbs from tags data.
 * - Last item has no hyperlink
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

module.exports = {
  getTagsFromReq,
  getTagBreadcrumbs
}