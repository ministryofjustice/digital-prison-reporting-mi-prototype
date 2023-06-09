/* global $, MOJFrontend */

$(function () {
  $('.moj-action-bar__filter').each(function (index, element) {
    // eslint-disable-next-line no-new
    new MOJFrontend.FilterToggleButton({
      startHidden: true,
      toggleButton: {
        container: $(element),
        showText: 'Show filter',
        hideText: 'Hide filter',
        classes: 'govuk-button--secondary'
      },
      filter: {
        container: $('.moj-filter')
      }
    })
  })
})
