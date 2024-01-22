/* global $ */
/* global axios */

$(function async () {
  $('[data-save-target]').each((index, element) => {
    $(element).on('click', async (event) => {
      event.stopPropagation()

      const baseUrl = window.location.origin
      const text = $(element).attr('data-save-title')
      const href = window.location.href
      const description = extractFilters(href)

      const data = {
        text,
        href,
        description,
        filters: description
      }

      const res = await axios.post(`${baseUrl}/main-ui/v5/addToMyList/`, {
        body: JSON.stringify(data)
      }).catch(function (error) {
        console.log(error)
      });
    })
  })
})

function extractFilters(href) {
  let description = ''
  const urlParams = new URLSearchParams(window.location.search)
  const filters = Array.from(urlParams.entries())
  const whitelist = ['direction', 'type']

  const sanitizedFilters = filters
    .map((filter) => {
      filter[0] = filter[0].replace('filters.', '')
      return filter
    })
    .filter((filter) => {
      if (whitelist.includes(filter[0])) return filter
    })
    
  for (const [key, value] of sanitizedFilters) {
    description += `${key}: ${value} <br>`
  }

  return description
}
