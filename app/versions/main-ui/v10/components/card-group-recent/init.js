/* global $ */

$(function () {
  $('.card--recent').each(function () {
    const card = $(this)
    const requestId = card.attr('data-request-id')
    const href = card.attr('data-href')
    const status = card.attr('data-status')

    card.on('click', async function () {
      if (status !== 'expired') {
        // eslint-disable-next-line no-undef
        await axios.post(`${baseUrl}/main-ui/v10/updateRecentlyViewed/`, {
          data: JSON.stringify({
            requestId,
            timestamp: Date.now(),
            viewedDate: new Date().toLocaleString(),
            sort: true
          })
        }).catch(function (error) {
          console.log(error)
        })
      }

      window.location.href = href
    })
  })
})
