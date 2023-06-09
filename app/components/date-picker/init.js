/* global $ */

$(function () {
  $('.date-input').each(function (index, element) {
    const disableFutureDates = Boolean($(element).data('disable-future-date'))
    const disablePastDates = Boolean($(element).data('disable-past-date'))
    const maxDate = disableFutureDates ? '0' : undefined
    const minDate = $(element).data('min-date') ? $(element).data('min-date') : disablePastDates ? '0' : undefined
    const dateFormat = 'dd/mm/yy'

    $(element).datepicker({
      dateFormat,
      showOtherMonths: true,
      selectOtherMonths: true,
      maxDate,
      minDate
    })
    $(element).prop('placeholder', 'DD/MM/YYYY')
  })
})
