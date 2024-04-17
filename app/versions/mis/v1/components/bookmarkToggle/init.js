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
        location.reload()
        await removeBookmark(metricData)
      }
    })
  })
})

const base_url = window.location.origin

async function addBookmark(metricData) {
  await axios.post(`${base_url}/mis/v1/addBookmark/`, { metricData });
}

async function removeBookmark(metricData) {
  await axios.post(`${base_url}/mis/v1/removeBookmark/`, { metricData });
}