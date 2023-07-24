/* global $ */

$(function () {
  $('[data-toggle-button]').each(function (index, element) {
    // eslint-disable-next-line no-new
    $(element).on('click', (event) => {
      event.stopPropagation()

      const show = $(element).data('toggle-button') !== 'true'

      if (show) {
        console.log('Show')
        $('[data-toggle-button]').each(function (index, toggledButton) {
          if ($(toggledButton).data('toggle-button') === 'true') {
            $(toggledButton).trigger('click')
          }
        })
      }

      const target = $($(element).data('toggle-button-target-selector'))

      target.css('display', show ? '' : 'none')

      const caption = $(element).data('toggle-button-caption-' + (show ? 'hide' : 'show'))
      $(element).html(caption)

      $(element).data('toggle-button', show ? 'true' : 'false')
    })
  })
})
