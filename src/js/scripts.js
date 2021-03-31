'use strict';

// Импортируем другие js-файлы


$(document).ready(function () {
  if ($(window).width() > 1279) {
    $('.g-agree-content__container').scrollBar({
      position: "y"
    });
  }

  let hideText = 'не показывать суть текста',
    showText = 'показать суть текста';

  $('.js__g-agree-switch').on('click', function () {
    if ($(this).text() === hideText) {
      $(this).text(showText);
    } else {
      $(this).text(hideText);
    }

    $('.g-agree-content__container').toggleClass('g-agree-hide__essence');
  });
});
