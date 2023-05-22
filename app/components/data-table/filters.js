/* Nunjuck filter methods to be included in an app's filters.js */

module.exports = {
  applySorting: (headers, dataTableOptions) => {
    const {
      selectedPage,
      pageSize,
      sortColumn,
      sortedAsc,
      mapOptionsToUrl
    } = dataTableOptions

    return headers.map((h, index) => {
      const ariaSort = ((index === Number(sortColumn)) ? (sortedAsc ? 'ascending' : 'descending') : 'none')

      return {
        ...h,
        html: '<button ' +
          'data-index="' + index + '" ' +
          'aria-sort="' + ariaSort + '" ' +
          'class="data-table-header-button data-table-header-button-sort-' + ariaSort + '" ' +
          'onclick="window.location.href=\'' + mapOptionsToUrl(selectedPage, pageSize, index, ariaSort !== 'ascending') + '\'"' +
          '>' + h.text + '</button>'
      }
    })
  }
}
