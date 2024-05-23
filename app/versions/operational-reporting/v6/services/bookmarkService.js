let bookmarks = []

/**
 * Creates the bookmark toggle html
 *
 * @param {*} id
 * @return {*} 
 */
const createBookMarkToggleHtml = (id) => {
  const checked = isBookmarked(id) ? 'checked' : null
  const tooltip = !checked ? 'Add Bookmark' : 'Remove Bookmark'
  return `<div class='bookmark dpr-bookmark-tooltip' tooltip="${tooltip}">
  <input class="bookmark-input" type='checkbox' id='${id}' ${checked} />
  <label for='${id}'></label>
</div>`
}

/**
 * Check if bookmark exists
 * @return {boolean} 
 */
const isBookmarked = (id) => {
  return bookmarks.filter((bmId) => bmId === id).length > 0
}

/**
 * Add data to the bookmarks array
 * - prevents duplicates
 * @param {*} data
 */
const addBookmark = (data) => {
  const { id } = data
  if (!isBookmarked(id)) bookmarks.push(id)
}

/**
 * Removes a bookmark from the bookmarks array
 * @param {*} id
 */
const removeBookmark = (data) => {
  const { id } = data
  const index = bookmarks.findIndex((bmId) => {
    return bmId === id
  })
  bookmarks.splice(index, 1)
}

const bumpBookmark = (data) => {
  const { id } = data
  removeBookmark(data)
  if (!isBookmarked(id)) bookmarks.unshift(id)
}

/**
 * Enhances the data for the bookmarked items
 *
 * @param {*} definitions
 * @return {*} 
 */
const getBookmarkData = (definitions) => {
  return bookmarks
    .map(id => {
      const report = definitions.find((def) => def.id === id)
      return {
        id,
        text: report.name,
        href: `./report/${report.id}`,
        tag: report.tags[0].text
      }
    })
}

const getBookMarkDefinitions = (definitions) => {
  return bookmarks
    .map((id) => definitions.find((def) => def.id === id))
}

const resetBookmarkList = () => {
  bookmarks = []
}

const getBookmarkPageData = (definitions, req, createRows, createHead, maxItems) => {
  const bookmarkDefinitions = getBookMarkDefinitions(definitions)
  const bookmarks = getBookmarkData(bookmarkDefinitions)
  const bookmarkRows = createRows(bookmarkDefinitions, req)

  return {
    slideData: {
      title: 'My Bookmarks',
      type: 'bookmarks',
      icon: 'bookmark',
      toggleId: 'bookmark-toggle',
      darkBg: true
    },
    cardData: {
      items: bookmarks.slice(0, maxItems),
      count: bookmarks.length
    },
    tableData: {
      rows: bookmarkRows.slice(0, maxItems),
      head: createHead(bookmarkRows).slice(0, 3)
    }
  }
}

module.exports = {
  createBookMarkToggleHtml,
  addBookmark,
  removeBookmark,
  bumpBookmark,
  bookmarks,
  isBookmarked,
  getBookmarkData,
  getBookMarkDefinitions,
  resetBookmarkList,
  getBookmarkPageData
}