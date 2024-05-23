let recentlyViewed = []
const maxLength = 15

/**
 * Check if item exists in recently viewed array
 * @return {boolean} 
 */
const isInRecentlyViewed = (id) => {
  return recentlyViewed.filter((rec) => rec.id === id).length > 0
}

/**
 * Add data to the recently viewed array
 * - prevents duplicates
 * @param {*} data
 */
const addToRecentlyViewed = (data) => {
  const { id } = data
  if (isInRecentlyViewed(id)) {
    removeFromRecentlyViewed(data)
  }
  recentlyViewed.unshift(data)

  if (recentlyViewed.length > maxLength) capRecentlyViewedLength(maxLength)
}

const capRecentlyViewedLength = (length) => {
  recentlyViewed.slice(0, length)
}

/**
 * Removes a recently viewed from the recently viewed array
 * @param {*} id
 */
const removeFromRecentlyViewed = (data) => {
  const { id } = data
  const index = recentlyViewed.findIndex((rec) => {
    return rec.id === id
  })
  recentlyViewed.splice(index, 1)
}

/**
 * Enhances the data for the recently viewed items
 *
 * @param {*} definitions
 * @return {*} 
 */
const getRecentlyViewedData = (definitions) => {
  return recentlyViewed
    .map(viewed => {
      const { id } = viewed
      const report = definitions.find((def) => def.id === id)
      return {
        id,
        text: report.name,
        href: `./report/${report.id}`,
        timestamp: viewed.timestamp,
        tag: report.tags[0].text
      }
    })
}

const getRecentlyViewedDefinitions = (definitions) => {
  return recentlyViewed
    .map((rec) => definitions.find((def) => def.id === rec.id))
}

const removeBookmarksFromRows = (rows) => {
  return rows.map(row => {
    row.shift()
    return row
  })
}

const resetRecentlyViewedList = () => {
  recentlyViewed = []
}

const getRecentlyViewedPageData = (definitions, req, createRows, createHead, maxItems) => {
  const recentlyViewedDefinitions = getRecentlyViewedDefinitions(definitions)
  const recentlyViewed = getRecentlyViewedData(definitions)
  let recentlyViewedRows = createRows(recentlyViewedDefinitions, req)

  return {
    slideData: {
      title: 'recently Viewed',
      type: 'recently-viewed',
      icon: 'viewed',
      toggleId: 'viewed-toggle',
      darkBg: false
    },
    cardData: {
      items: recentlyViewed.slice(0, maxItems),
      count: recentlyViewed.length
    },
    tableData: {
      rows: recentlyViewedRows.slice(0, maxItems),
      head: createHead(recentlyViewedRows).slice(0, 3)
    }
  }
}

module.exports = {
  addToRecentlyViewed,
  getRecentlyViewedData,
  resetRecentlyViewedList,
  getRecentlyViewedDefinitions,
  removeBookmarksFromRows,
  getRecentlyViewedPageData
}