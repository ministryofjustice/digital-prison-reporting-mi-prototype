const bookmarks = []

/**
 * Creates the bookmark toggle html
 *
 * @param {*} id
 * @return {*} 
 */
const createBookMarkToggleHtml = (id) => {
  const checked = isBookmarked(id) ? 'checked' : null
  return `<div class='bookmark'>
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

/**
 * Enhances the data for the bookmark
 *
 * @param {*} definitions
 * @return {*} 
 */
const getBookmarkData = (definitions) => {
  return definitions
    .filter((report) => bookmarks.includes(report.id))
    .map(report => {
      const { id } = report
      return {
        id,
        text: report.text,
        href: `./report/${report.id}`,
      }
    })
}

module.exports = {
  createBookMarkToggleHtml,
  addBookmark,
  removeBookmark,
  bookmarks,
  isBookmarked,
  getBookmarkData
}