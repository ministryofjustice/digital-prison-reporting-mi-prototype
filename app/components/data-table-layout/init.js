/* global $ */

$(function () {
  $('button[data-toggle-button]').each(function (index, element) {
    // eslint-disable-next-line no-new
    $(element).on('click', (event) => {
      event.stopPropagation()

      const show = $(element).data('toggle-button') !== 'true'

      const target = $($(element).data('toggle-button-target-selector'))

      target.css('display', show ? '' : 'none')

      const caption = $(element).data('toggle-button-caption-' + (show ? 'hide' : 'show'))
      $(element).html(caption)

      $(element).data('toggle-button', show ? 'true' : 'false')
    })
  })
})
