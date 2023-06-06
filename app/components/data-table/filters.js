/* Nunjuck filter methods to be included in an app's filters.js */

module.exports = {
  applySorting: (headers, dataTableOptions, createUrlForParameters) => {
    const {
      sortColumn,
      sortedAsc
    } = dataTableOptions

    return headers.map((h, index) => {
      let ariaSort = 'none'
      let url = createUrlForParameters({
        sortColumn: index,
        sortedAsc: true
      })

      if (index === Number(sortColumn)) {
        ariaSort = sortedAsc ? 'ascending' : 'descending'

        if (sortedAsc) {
          url = createUrlForParameters({
            sortColumn: index,
            sortedAsc: false
          })
        }
      }

      return {
        ...h,
        html: '<button ' +
          'data-index="' + index + '" ' +
          'aria-sort="' + ariaSort + '" ' +
          'class="data-table-header-button data-table-header-button-sort-' + ariaSort + '" ' +
          'onclick="window.location.href=\'' + url + '\'"' +
          '>' + h.text + '</button>'
      }
    })
  }
}
