/* global $ */

$(function () {
  $('.remove-bookmark').each(function () {
    const removeBookmarkButton = $(this)
    const id = removeBookmarkButton.attr('data-id')
    const totalRows = $('#Bookmark-count').attr('data-total-rows')
    removeBookmarkButton.click((event) => {
      event.stopPropagation()
      const row = +id
      $('#' + id).prop('checked', false)
      $('.card-group__item[data-id=' + id + ']').css('display', 'none')
      $('#my-bookmarks-table .govuk-table__body tr:eq(' + row + ')').css('display', 'none')

      const hidden = $('li.card-group__item--bookmark[style*="display: none"]')

      $('#Bookmark-count').html(totalRows - hidden.length)
    })
  })

  $('#toggle-list-view').click(() => {
    $('#bookmark-card-view').css('display', 'none')
    $('#my-bookmarks-table').css('display', 'block')
    $('.insight-card-headline-group-list-item').css('display', 'block')
    $('.insight-card-headline-group-card-item').css('display', 'none')
    $('.insight-card-container').css('row-gap', '0').css('column-gap', '0')
    $('#toggle-list-view').addClass('active')
    $('#toggle-card-view').removeClass('active')
  })

  $('#toggle-card-view').click(() => {
    $('#bookmark-card-view').css('display', 'block')
    $('#my-bookmarks-table').css('display', 'none')
    $('.insight-card-headline-group-list-item').css('display', 'none')
    $('.insight-card-headline-group-card-item').css('display', 'block')
    $('.insight-card-container').css('row-gap', '10px').css('column-gap', '10px')
    $('#toggle-card-view').addClass('active')
    $('#toggle-list-view').removeClass('active')
  })
})
