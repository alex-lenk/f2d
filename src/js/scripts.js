'use strict';

// Импортируем другие js-файлы
import './general-snippet/tab';
import './general-snippet/login';
import './general-snippet/mask';
import './general-snippet/form-validate';
import './general-snippet/dropdown';
import './general-snippet/common.js';
import './snippets-mobile/header-toggle';


const container = document.querySelector('#container');

const ps = new PerfectScrollbar(container);

// or just with selector string
//const ps = new PerfectScrollbar('#container');


/* BEGIN:  Условие для планшетных версий */
if ($(window).width() < 992 && $(window).width() > 765) {
  $('.footer-nav__wrap + div').appendTo('.footer-nav__wrap .row');
}
/* END */


$(document).ready(function () {
  /* BEGIN: определяем высоту элемента и сразу присваиваем инлайновым стилем min-height */
  let detailAbout = $('.detail-about.js__tabs');
  let getHeightDetailAbout = detailAbout.height();
  detailAbout.css('min-height', getHeightDetailAbout + 'px');
  /* END */



  /* BEGIN: Инициализация плавающего блока на десктопной версия странице "правила и помощь" */
  $('.aside-fly').stick_in_parent({
    inner_scrolling: true,
    offset_top: 90
  });
  /* END */


  /* BEGIN: Инициализация плавающего блока на десктопной версия странице "правила и помощь" */
  $('.detail-info').stick_in_parent({
    inner_scrolling: true,
    offset_top: 90
  });
  /* END */


  /* BEGIN: Клик на любой из этих селекторов плавно перебросит страницу вверх к body (десктопная версия  "правила и помощь") */
  $('body').on('click', '.aside-title-link.collapsed, .aside-fly-fixed .js__tab-nav, .js__aside-rules, .js__aside-help', function () {
    let fixed_offset = 0;
    $('html, body').stop().animate({scrollTop: $('body').offset().top - fixed_offset}, 900);
  });
  /* END */


  /* BEGIN: Сортировка по цене добавление и удаление иконок */
  $('.filter-sorter__state-price').click(function () {
    if ($(this).hasClass('icon-increase')) {
      $(this).removeClass('icon-increase');
      $(this).addClass('icon-decrease');
    } else {
      $(this).addClass('icon-increase');
      $(this).removeClass('icon-decrease');
    }
  });
  /* END */


  /* BEGIN: Для панелей с фильтрами */
  $('.catalog-widget__title').on('click', function () {
    $(this).toggleClass('catalog-widget__active');
    $(this).next().slideToggle();
  });

  $('.catalog-widget__clear').on('click', function () {
    $(this).closest('.catalog-widget__body').find('.custom-control-input').prop('checked', false).change();
  });
  /* END */


  /* BEGIN: Клик по кнопке "выбрать развлечения", появится панель с навигацией */
  let navCatalogPanel = '.nav-catalog-panel';
  $('.js__nav-catalog-btn').click(function () {
    $(navCatalogPanel).addClass('nav-catalog-opened');
  });

  /* END */


  /* BEGIN: Клик по кнопке "все развлечения" .top-panel-all */
  let entertainment = '.entertainment';
  let entertainmentOpened = 'entertainment-opened';

  $('.top-panel-all').click(function () {
    $(entertainment).toggleClass(entertainmentOpened);
  });

  $(entertainment).on('click', function (e) {
    if ($(entertainment).has(e.target).length === 0 && !$('.top-panel-all').is(e.target)) {
      $(entertainment).removeClass(entertainmentOpened)
    }
  });
  /* END */


  /* BEGIN: Логика появления панели поиска и ввода данных  */
  let searchFormBoxInput = $('.search-form-box__input'),
    searchFormBox = $('.search-form-box'),
    searchFormBoxClear = $('.search-form-box__clear'),
    searchFormBoxBack = $('.search-form-box__back'),
    searchArea = '.search-area',
    searchResult = $('.search-result');

  searchFormBoxInput.keyup(function () {
    let value = $(this).val().length;

    if (value >= 2) {
      searchFormBox.removeClass('icon-search');
      searchFormBoxBack.addClass('active');
      searchFormBoxClear.addClass('active');
      searchResult.addClass('active');
    } else {
      searchFormBoxClear.removeClass('active');
      searchResult.removeClass('active');
    }
  });

  searchFormBoxClear.click(function () {
    searchFormBoxInput.val('').focus();
    $(this).removeClass('active');
    searchResult.removeClass('active');
    searchFormBoxBack.removeClass('active');
    searchFormBox.addClass('icon-search');
  });

  searchFormBoxBack.click(function () {
    $(this).removeClass('active');
    searchFormBox.addClass('icon-search');
    searchFormBoxClear.removeClass('active');
    searchResult.removeClass('active');
    searchFormBoxInput.val('');
  });

  $('.js__search').click(function () {
    $(searchArea).addClass('active');
    $(entertainment).removeClass(entertainmentOpened);
    searchFormBoxInput.val('').focus();
  });

  $('.search-area__close').click(function () {
    $(searchArea).removeClass('active');
  });

  $(searchArea).click(function (e) {
    if ($(searchArea).has(e.target).length === 0) {
      $(searchArea).removeClass('active')
    }
  });
  /* END */


  /* BEGIN: Initialization carousel */
  $('.popular-section__list').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="control-arrow control-arrow__prev btn-circle btn-circle__medium slick-prev"><span class="icon-arrow-left btn-text"></span></button>',
    nextArrow: '<button type="button" class="control-arrow control-arrow__next btn-circle btn-circle__medium slick-next"><span class="icon-arrow-right btn-text"></span></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });
  /* END */


  /* BEGIN: Вывод имени файла в див */
  $('.js__decor-file').change(function (e) {
    $(this).next().text(e.target.files[0].name);
  });


  $('.js__multi-upload').change(function () {
    if ($(this).val() !== '') {
      $(this).next().text('Выбрано файлов: ' + $(this)[0].files.length);
    }
  });
  /* END */


  /* BEGIN: Проверка на textarea и авторесайз textarea тега */
  let textarea = $('textarea');
  if (textarea.length > 0) {
    textarea.each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
  /* END */


  /* BEGIN: Для закрытия разных панелей при нажатии на пустое пространство */
  $(document).mouseup(function (e) {
    if ($(navCatalogPanel).has(e.target).length === 0) {
      $(navCatalogPanel).removeClass('nav-catalog-opened');
    }
  });
  /* END */


  /* BEGIN: Ограничение выбора чекбоксов при добавление категории из lk-vend-EVENTS-desk-02.html */
  $('#modal-add-event .custom-control-input').on("change", function () {
    let limitReached = ($('#modal-add-event .custom-control-input:checked').length === 2);
    $('.custom-control-input:not(:checked)').prop("disabled", limitReached);
  });
  /* END */


  /* BEGIN: Initialization carousel on the gallery detail page */
  let detailGalleryCarousel = $('.detail-gallery__carousel');

  detailGalleryCarousel.carousel({
    dist: -30,
    indicators: true,
    shift: -300
  });

  $('.detail-gallery__prev').click(function () {
    detailGalleryCarousel.carousel('prev');
  });

  $('.detail-gallery__next').click(function () {
    detailGalleryCarousel.carousel('next');
  });
  /* END */


  /* BEGIN: Добавление блока промокода и удаление его */
  $('.js__enter-promo-code').click(function () {
    $('.js__personal-area-discount').fadeIn();
  });
  $('.js__cancel-promo-code').click(function () {
    $(this).closest('.js__personal-area-discount').fadeOut();
  });
  $('.js__delete-promo-code').click(function () {
    $(this).parent().fadeOut();
  });
  /* END */



  /* BEGIN: Инициализация календаря на деталке товара */
  $('#detail-event').datepicker({
    numberOfMonths: 2, /*Показываем 2 месяца */
    showOtherMonths: true,
    onSelect: function (dateText) {
      $('.js__detail-calendar').val(dateText);
    }
  });
  /* END */


  /* BEGIN: Логика для заказ_мероприятия показываем календарь и выбираем групповое время */
  $('#ordering-event').datepicker({
    numberOfMonths: 2, /*Показываем 2 месяца */
    showOtherMonths: true,
    onSelect: function (dateText) {
      $('.js__select-date').val(dateText);
      $(this).addClass('d-none');
    }
  });

  $('.js__select-date').on('click', function () {
    $('#ordering-event').toggleClass('d-none');

    if ($(this).attr('placeholder') === 'Выбрать дату') {
      $(this).attr('placeholder', 'Свернуть календарь');
    } else {
      $(this).attr('placeholder', 'Выбрать дату');
    }
  });


  $('.js__select__time').on('click', '.dropdown-item', function () {
    let time = $(this).text();
    $('.dropdown-select').text(time).removeClass('dropdown-active');
  });
  /* END */
});
