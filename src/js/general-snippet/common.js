$(document).ready(function () {
  /* BEGIN: При открытии аккордиона предыдущий блок со списком прячется (страница "правила и помощь") */
  let asideRules = '#aside-rules',
    asideHelp = '#aside-help';

  $('.js__aside-rules').click(function () {
    $(asideRules).removeClass('d-none');
    $(asideHelp).addClass('d-none');
  });
  $('.js__aside-help').click(function () {
    $(asideHelp).removeClass('d-none');
    $(asideRules).addClass('d-none');
  });
  /* END */

  /* BEGIN: "Показать ещё" порциями показываем по три блока */
  let toggleMoreShow = ".toggle-more-show",
    toggleMoreCollapse = ".toggle-more-collapse",
    showMoreCount = 3,
    allItems = $(".toggle-more-item").length;

  $('.toggle-more-list').each(function () {
    $(this).find(toggleMoreCollapse).hide();
    $(this).find('.toggle-more-item').slice(showMoreCount, allItems).hide().addClass('is-hidden');
  })

  $(toggleMoreShow).on('click', function () {
    let thx = $(this).parents('.toggle-more-list');
    let colItems = thx.find(".toggle-more-item.is-hidden").length;
    if (colItems) {
      thx.find(".toggle-more-item.is-hidden").slice(0, showMoreCount).slideDown().removeClass('is-hidden');
      thx.find(toggleMoreCollapse).fadeIn();
    }
    if (colItems <= showMoreCount) {
      thx.find(toggleMoreShow).hide();
    }
  });

  $(toggleMoreCollapse).on('click', function () {
    let thx = $(this).parents('.toggle-more-list');
    thx.find(".toggle-more-item").slice(showMoreCount, allItems).slideUp().addClass('is-hidden');
    thx.find(toggleMoreShow).show();
    thx.find(toggleMoreCollapse).hide();
  });
  /* END: */

  /* BEGIN: Плавная прокрутка к ID */
  $('.js__go-anchor').on('click', function (e) {
    e.preventDefault();
    let fixed_offset = 90;
    $('html, body').stop().animate({scrollTop: $(this.hash).offset().top - fixed_offset}, 900);
  });
  /* END */


  /* BEGIN: Логика добавления звездного рейтинга */
  let ratingReviewItem = '.rating-review-item';
  let ratingReviewActive = 'rating-review-active';

  $('.rating-review').on('click', ratingReviewItem, function () {
    $(this).parent().removeClass('rating-review__no-rade');

    if ($(ratingReviewItem).hasClass(ratingReviewActive)) {
      $(ratingReviewItem).removeClass(ratingReviewActive);
    }
    $(this).addClass(ratingReviewActive);

    $('.js__rating-review').removeClass('disabled');
  });
  /* END */


  /* BEGIN: Логика добавления рейтинга в картинках */
  $('.js__estimate').on('click', '.estimate-item', function () {
    $(this).toggleClass('estimate-item__active');

    if ($('.estimate-item').hasClass('estimate-item__active')) {
      $('.js__rating-estimate').removeClass('disabled');
    } else {
      $('.js__rating-estimate').addClass('disabled');
    }
  });
  /* END */


  /* BEGIN: Логика для ЛК пользователя (карточка мероприятия) - "написать отзыв" */
  $('.js__rating-review').click(function () {
    $('#review-step-1').addClass('d-none');
    $('#review-step-2').removeClass('d-none');
  });

  $('.js__rating-estimate').click(function () {
    $('#review-step-2').addClass('d-none');
    $('#review-step-3').removeClass('d-none');
  });

  $('.js__add-review').click(function () {
    $('#review-step-3').addClass('d-none');
    $('#review-step-4').removeClass('d-none');
    $(this).closest('.modal-content').find('.modal-content__title').addClass('d-none');
  });

  $('.js__review-team').click(function () {
    $('#review-step-4').addClass('d-none');
    $('#review-step-5').removeClass('d-none');
  });

  $('.js__review-final').click(function () {
    $('#review-step-5').addClass('d-none');
    $('#review-step-6').removeClass('d-none');

    setTimeout(function () {
      $('#write-review').modal('hide');
    }, 2500);
  });
  /* END */


  /* BEGIN: Добавление счетчика при клике на + - */
  $('.js-amount-plus').click(function () {
    let input = $(this).prev();

    input.val(parseInt(input.val()) + 1).change();
  });

  $('.js-amount-minus').click(function () {
    let input = $(this).next();

    if (input.val() > 0) {
      input.val(parseInt(input.val()) - 1).change();
    }
  });
  /* END */
});
