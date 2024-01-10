/* global $ */

$(function () {
  $('button[data-toggle-button]').each(function (index, element) {
    // eslint-disable-next-line no-new
    $(element).on('click', (event) => {
      event.stopPropagation()

      const show = $(element).data('toggle-button') !== 'true'
      const target = $($(element).data('toggle-button-target-selector'))
      const targetGroup = $($(element).data('toggle-button-target-group'))

      targetGroup.each((index, t) => {
        const groupMember = $(t)
        if (!show || groupMember.data('toggle-button-target-selector') !== $(element).data('toggle-button-target-selector')) {
          $(groupMember.data('toggle-button-target-selector')).css('display', 'none')
          groupMember.html(groupMember.data('toggle-button-caption-show'))
          groupMember.data('toggle-button', 'false')
        }
      })

      if (show) {
        target.css('display', '')
        $(element).html($(element).data('toggle-button-caption-hide'))
        $(element).data('toggle-button', 'true')
      }
    })
  })
})
