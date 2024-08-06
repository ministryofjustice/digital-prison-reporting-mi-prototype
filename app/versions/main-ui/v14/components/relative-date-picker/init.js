/* global $ */
$(function () {
  $("input[name='relative-date-duration']").change(function () {
    updateDatePickerValues()
  });

  $("input[name='relative-date-options']").change(function () {
    updateDatePickerValues()
  });

  $("input[name='use-relative-date']").change(function () {
    if ($("input[name='use-relative-date']").is(":checked")) {
      updateDatePickerValues()
    }
  })

  $("input[name='filters.date.end']").change(function () {
    const { optionsValue } = getRangeValues()
    if (optionsValue && optionsValue === 'prior' && $("input[name='use-relative-date']").is(":checked")) {
      updateDatePickerValues()
    }
    if (optionsValue && optionsValue === 'future' && $("input[name='use-relative-date']").is(":checked")) {
      $("input[name='use-relative-date").trigger('click')
    }
  });

  $("input[name='filters.date.start']").change(function () {
    const { optionsValue } = getRangeValues()
    if (optionsValue && optionsValue === 'future' && $("input[name='use-relative-date']").is(":checked")) {
      updateDatePickerValues()
    }
    if (optionsValue && optionsValue === 'prior' && $("input[name='use-relative-date']").is(":checked")) {
      $("input[name='use-relative-date").trigger('click')
    }
  });

  const updateDatePickerValues = () => {
    const { rangeValue, optionsValue } = getRangeValues()
    const { startDate, endDate } = setDateValuesFromOptions(rangeValue, optionsValue)

    setDatepickerValues(startDate, endDate)
  }

  const setDatepickerValues = (startDate, endDate) => {
    const startDateString = startDate.format('YYYY-MM-DD').toString()
    $("input[name='filters.date.start']").val(startDateString)

    const endDateString = endDate.format('YYYY-MM-DD').toString()
    $("input[name='filters.date.end']").val(endDateString)
  }

  const getRangeValues = () => {
    const rangeValue = $("input[name='relative-date-duration']:checked").val();
    const optionsValue = $("input[name='relative-date-options']:checked").val();

    return {
      rangeValue,
      optionsValue
    }
  }

  const setDateValuesFromOptions = (rangeValue, optionsValue) => {
    let endDate
    let startDate

    switch (optionsValue) {
      case 'prior':
        ({ startDate, endDate } = setDateValuesPrior(rangeValue))
        break;
      case 'future':
        ({ startDate, endDate } = setDateValuesFuture(rangeValue))
        break;
      default:
        break;
    }

    return {
      startDate,
      endDate
    }
  }

  const setDateValuesPrior = (rangeValue) => {
    const endDateString = $("input[name='filters.date.end']").val()
    const endDate = dayjs(endDateString)
    let startDate

    switch (rangeValue) {
      case '1week':
        startDate = endDate.subtract(1, 'week')
        break;
      case '2weeks':
        startDate = endDate.subtract(2, 'week')
        break;
      case '1month':
        startDate = endDate.subtract(1, 'month')
        break;
      case '3months':
        startDate = endDate.subtract(3, 'month')
        break;
      case '6months':
        startDate = endDate.subtract(6, 'month')
        break;
      case '1year':
        startDate = endDate.subtract(1, 'year')
        break;
      default:
        break;
    }

    return {
      startDate,
      endDate
    }
  }

  const setDateValuesFuture = (rangeValue) => {
    const startDateString = $("input[name='filters.date.start']").val()
    const startDate = dayjs(startDateString)
    let endDate

    switch (rangeValue) {
      case '1week':
        endDate = startDate.add(1, 'week')
        break;
      case '2weeks':
        endDate = startDate.add(2, 'week')
        break;
      case '1month':
        endDate = startDate.add(1, 'month')
        break;
      case '3months':
        endDate = startDate.add(3, 'month')
        break;
      case '6months':
        endDate = startDate.add(6, 'month')
        break;
      case '1year':
        endDate = startDate.add(1, 'year')
        break;
      default:
        break;
    }

    return {
      startDate,
      endDate
    }
  }
})
