/* global $ */

$(function () {
  $('.card--status').each(function () {
    const card = $(this)
    const href = card.attr('data-href')
    const requestId = card.attr('data-request-id')
    const status = card.attr('data-status')

    card.on('click', async function () {
      if (status === 'ready') {
        // eslint-disable-next-line no-undef
        await axios.post(`${baseUrl}/main-ui/v10/addToRecentlyViewed/`, {
          data: JSON.stringify({
            requestId,
            status: '',
            timestamp: Date.now(),
            viewedDate: new Date().toLocaleString()
          })
        }).catch(function (error) {
          console.log(error)
        })
      }
      window.location.href = href
    })
  })
})
