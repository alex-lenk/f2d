function openMenu() {
  $('.header-toggle').toggleClass('icon-menu icon-close');
  $('body').toggleClass('menu-open');
  $('.nav-catalog-panel').removeClass('nav-catalog-opened');
  $('.nav-catalog-dropdown').removeClass('active');
}

$(document).ready(function () {
  $('.header-toggle').click(function () {
    openMenu();
    $('.darkening-layer').fadeToggle();
  });

  $('.js__open-menu').click(function () {
    openMenu();
  });

  $('.menu-entertainment__item').click(function () {
    $('body').addClass('menu-entertainment__open');
  });

  $('.menu-entertainment__close').click(function () {
    $('body').removeClass('menu-entertainment__open');
    $('.menu-entertainment__item').removeClass('active');
  });

  $('.js__go-anchor--org').click(function () {
    $('.header-toggle').toggleClass('icon-menu icon-close');
    $('body').toggleClass('menu-open');
    $('.darkening-layer').fadeOut();
  });

  $('.darkening-layer').click(function () {
    openMenu();
    $(this).fadeOut();
  });

  if ($(window).width() < 992) {
    $('.js__toggle-menu').click(function () {
      openMenu();
      $('.darkening-layer').fadeToggle();
    });
  }
});
