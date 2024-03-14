/* global $ */

$(function () {
  $('[data-card]').each((index, element) => {
    $(element).on('click', (event) => {
      event.stopPropagation()
      const url = $(element).data("href")

      const loadingPanel = $(element).find('.loading-panel')
      $(loadingPanel).addClass('show')
      $(element).addClass("card--loading")

      $(".card--clickable").not(".card--loading").each((index, disabledCards) => {
        $(disabledCards).addClass("card--disabled")
      })

      $(".card--clickable").each((index, element) => {
        $(element).removeClass("card--clickable")
        $(element).addClass("card--loading-state")
      })

      setTimeout(() => {
        // reset
        $(".card--loading-state").each((index, element) => {
          $(element).removeClass("card--disabled")
          $(element).removeClass("card--loading")
          $(element).removeClass("card--loading-state")
          $(element).addClass("card--clickable")
        })
        $(loadingPanel).removeClass('show')

        window.location.href = url
      }, 5000);
    })
  })
})