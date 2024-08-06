/* global $ */
/* global dayjs */

$(function () {
  $("input[name='relative-date-radio']").change(function () {
    updateDatePickerValues()
  })

  $("input[name='relative-date-start-radio']").change(function () {
    updateDatePickerValues()
  })

  $("input[name='filters.date.end']").change(function () {
    const { optionsValue } = getRangeValues()
    if (optionsValue && optionsValue === 'from-end-date' && $("input[name='use-relative-date']").is(':checked')) {
      updateDatePickerValues()
    }
  })

  const updateDatePickerValues = () => {
    const { rangeValue, optionsValue } = getRangeValues()
    const { startDate, endDate } = setDateValues(rangeValue, optionsValue)

    setDatepickerValues(startDate, endDate)
  }

  const setDatepickerValues = (startDate, endDate) => {
    const startDateString = startDate.format('YYYY-MM-DD').toString()
    $("input[name='filters.date.start']").val(startDateString)

    const endDateString = endDate.format('YYYY-MM-DD').toString()
    $("input[name='filters.date.end']").val(endDateString)
  }

  const getRangeValues = () => {
    const rangeValue = $("input[name='relative-date-radio']:checked").val()
    const optionsValue = $("input[name='relative-date-start-radio']:checked").val()

    return {
      rangeValue,
      optionsValue
    }
  }

  const setDateValues = (rangeValue, optionsValue) => {
    let endDate
    let startDate

    switch (optionsValue) {
      case 'from-today':
        ({ startDate, endDate } = setDateValuesFromToday(rangeValue))
        break
      case 'from-start':
        ({ startDate, endDate } = setDateValuesFromStart(rangeValue))
        break
      case 'include-current':
        ({ startDate, endDate } = setDateValuesFromCurrent(rangeValue))
        break
      case 'from-end-date':
        ({ startDate, endDate } = setDateValuesFromEndDate(rangeValue))
        break
      default:
        break
    }

    return {
      startDate,
      endDate
    }
  }

  const setDateValuesFromToday = (rangeValue) => {
    let startDate
    const endDate = dayjs()

    switch (rangeValue) {
      case '1week':
        startDate = dayjs().subtract(1, 'week')
        break
      case '2weeks':
        startDate = dayjs().subtract(2, 'week')
        break
      case '1month':
        startDate = dayjs().subtract(1, 'month')
        break
      case '3months':
        startDate = dayjs().subtract(3, 'month')
        break
      case '6months':
        startDate = dayjs().subtract(6, 'month')
        break
      case '1year':
        startDate = dayjs().subtract(1, 'year')
        break
      default:
        break
    }

    return {
      startDate,
      endDate
    }
  }

  const setDateValuesFromStart = (rangeValue) => {
    let startDate
    let endDate

    switch (rangeValue) {
      case '1week':
        endDate = dayjs().startOf('week')
        startDate = endDate.subtract(1, 'week')
        break
      case '2weeks':
        endDate = dayjs().startOf('week')
        startDate = endDate.subtract(2, 'week')
        break
      case '1month':
        endDate = dayjs().startOf('month')
        startDate = dayjs().subtract(1, 'month').startOf('month')
        break
      case '3months':
        endDate = dayjs().startOf('month')
        startDate = dayjs().subtract(2, 'month').startOf('month')
        break
      case '6months':
        endDate = dayjs().startOf('month')
        startDate = dayjs().subtract(6, 'month').startOf('month')
        break
      case '1year':
        endDate = dayjs().startOf('year')
        startDate = dayjs().subtract(1, 'year').startOf('year')
        break
      default:
        break
    }

    return {
      startDate,
      endDate
    }
  }

  const setDateValuesFromCurrent = (rangeValue) => {
    let startDate
    let endDate

    switch (rangeValue) {
      case '1week':
        endDate = dayjs().endOf('week')
        startDate = dayjs().endOf('week').subtract(1, 'week')
        break
      case '2weeks':
        endDate = dayjs().endOf('week')
        startDate = dayjs().endOf('week').subtract(2, 'week')
        break
      case '1month':
        endDate = dayjs().endOf('month')
        startDate = dayjs().endOf('month').subtract(1, 'month')
        break
      case '3months':
        endDate = dayjs().endOf('month')
        startDate = dayjs().endOf('month').subtract(3, 'month')
        break
      case '6months':
        endDate = dayjs().endOf('month')
        startDate = dayjs().endOf('month').subtract(6, 'month')
        break
      case '1year':
        endDate = dayjs().endOf('year')
        startDate = dayjs().endOf('year').subtract(1, 'year')
        break
      default:
        break
    }

    return {
      startDate,
      endDate
    }
  }

  const setDateValuesFromEndDate = (rangeValue) => {
    const endDateString = $("input[name='filters.date.end']").val()
    const endDate = dayjs(endDateString)
    let startDate

    switch (rangeValue) {
      case '1week':
        startDate = endDate.subtract(1, 'week')
        break
      case '2weeks':
        startDate = endDate.subtract(2, 'week')
        break
      case '1month':
        startDate = endDate.subtract(1, 'month')
        break
      case '3months':
        startDate = endDate.subtract(3, 'month')
        break
      case '6months':
        startDate = endDate.subtract(6, 'month')
        break
      case '1year':
        startDate = endDate.subtract(1, 'year')
        break
      default:
        break
    }

    return {
      startDate,
      endDate
    }
  }
})
