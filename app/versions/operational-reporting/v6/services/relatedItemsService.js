/**
 * get the related items for an individual tag
 *
 * @param {*} { tag, duplicates, definition }
 * @return {*}
 */
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
    .slice(0, 3)
}

/**
 * Get the related items of a report
 *
 * @param {*} reportData
 * @return {*}
 */
const getRelatedItems = (reportData, definition) => {
  const tags = [...reportData.tags]
  tags.shift()
  let duplicates = []
  const relatedItems = []

  tags.forEach((tag) => {
    const related = getRelatedByTags({ tag: tag.text, duplicates, definition })
    relatedItems.push({ tag, items: related })
    duplicates = related
  })

  return relatedItems
}

module.exports = {
  getRelatedItems
}
