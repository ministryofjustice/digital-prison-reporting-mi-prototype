/* global $, MOJFrontend */

$(function () {
  $('.moj-action-bar__filter').each(function (index, element) {
    new MOJFrontend.FilterToggleButton({
      bigModeMediaQuery: '(min-width: 48.063em)',
      startHidden: true,
      toggleButton: {
        container: $(element),
        showText: 'Show filter',
        hideText: 'Hide filter',
        classes: 'govuk-button--secondary'
      },
      closeButton: {
        container: $('.moj-filter__header-action'),
        text: 'Close'
      },
      filter: {
        container: $('.moj-filter')
      }
    })
  })
})
