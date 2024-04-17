/* global $ */

$(function () {
  $('.metric-bookmark-input:input[type=checkbox]').each(function () {
    const toggle = $(this)
    const metricData = toggle.attr('data-metric')
    toggle.change(async () => {
      if (toggle.is(':checked')) {
        await addBookmark(metricData)
      }

      if (!toggle.is(':checked')) {
        await removeBookmark(metricData)
      }
    })
  })

  $('.metric-bookmark-input--remove:input[type=checkbox]').each(function () {
    const toggle = $(this)
    const metricData = toggle.attr('data-metric')
    toggle.change(async () => {
      if (!toggle.is(':checked')) {
        // eslint-disable-next-line no-undef
        location.reload()
        await removeBookmark(metricData)
      }
    })
  })
})

const baseUrl = window.location.origin

const addBookmark = async (metricData) => {
  // eslint-disable-next-line no-undef
  await axios.post(`${baseUrl}/mis/v1/addBookmark/`, { metricData })
}

const removeBookmark = async (metricData) => {
  // eslint-disable-next-line no-undef
  await axios.post(`${baseUrl}/mis/v1/removeBookmark/`, { metricData })
}
