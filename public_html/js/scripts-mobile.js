 (function(modules) { 
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		module.l = true;
 		return module.exports;
 	}
 	__webpack_require__.m = modules;
 	__webpack_require__.c = installedModules;
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
 	__webpack_require__.p = "";
 	return __webpack_require__(__webpack_require__.s = 8);
 })
 ([
 (function(module, exports) {

(function ($) {
  $(function () {
    $('.js__tabs-list').on('click', '.js__tab-nav:not(.active)', function () {
      $(this).addClass('active').siblings().removeClass('active').closest('.js__tabs').find('.js__tab-panel').removeClass('active').eq($(this).index()).addClass('active');
    });
  });
})(jQuery);



function fnTabLinks(elClass) {
  elClass.forEach(function (el) {
    el.classList.remove("active");
  });
}


function fnTabPane(elClass) {
  elClass.forEach(function (el) {
    el.classList.remove("active");
  });
}

var js__tabItem = document.querySelectorAll(".js__tab-item"),
    js__tabBox = document.querySelectorAll(".js__tab-box");
js__tabItem.forEach(function (el) {
  el.addEventListener("click", openInTabs);
});

function openInTabs(el) {
  var btnTarget = el.currentTarget,
      idTab = btnTarget.dataset.tab;
  fnTabLinks(js__tabItem);
  fnTabPane(js__tabBox);
  document.querySelector("#" + idTab).classList.add("active");
  btnTarget.classList.add("active");
}

 }),
 (function(module, exports) {

var modalLogin = '#modal-login',
    modalForgot = '#modal-form-forgot',
    modalRegister = '#modal-form-register',
    modalLogin__org = '#modal-login__org',
    modalForgot__org = '#modal-form-forgot__org',
    modalRegister__org = '#modal-form-register__org';
$(document).ready(function () {
  var bodyEl = $('body');
  $('.js__auth').click(function () {
    $(this).closest('.modal').fadeOut();
    setTimeout(function () {
      if (!bodyEl.hasClass('modal-open')) {
        bodyEl.addClass('modal-open');
      }
    }, 400);
  });
  var hash = window.location.hash;

  if (hash === modalForgot || hash === '/#modal-forgot') {
    $('#modal-forgot__org').modal('show');
  } else if (hash === modalLogin || hash === '/#modal-login') {
    $('#modal-auth__org').modal('show');
  } else if (hash === modalRegister || hash === '/#modal-register') {
    $('#modal-register__org').modal('show');
  }



  $(modalLogin).validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      },
      password: {
        required: true,
        minlength: 8
      }
    }
  });
  $(modalForgot).validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      }
    },
    messages: {
      email: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      }
    }
  });
  $(modalRegister).validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      }
    },
    messages: {
      acceptAgreement: {
        required: "Вы должны согласиться на обработку персональных данных"
      }
    }
  });
  $(modalLogin__org).validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      },
      password: {
        required: true,
        minlength: 8
      }
    }
  });
  $(modalForgot__org).validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      }
    }
  });
  $(modalRegister__org).validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      },
      phone: {
        required: true,
        minlength: 17
      },
      fullname: {
        required: true
      },
      acceptAgreement: {
        required: true
      },
      legal_inn: {
        required: true,
        minlength: 10,
        maxlength: 12,
        digits: true
      }
    },
    messages: {
      email: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 8 символов"
      },
      phone: {
        required: "Введите номер телефона",
        minlength: "Пожалуйста, введите правильный номер телефона"
      },
      acceptAgreement: {
        required: "Вы должны согласиться на обработку персональных данных"
      },
      legal_inn: {
        minlength: "введите не менее 10 цифр",
        maxlength: "введите не более 12 цифр",
        digits: "введите корректное число",
        required: "обязательно к заполнению"
      },
      fullname: {
        required: "обязательно к заполнению"
      }
    }
  });
});

 }),
 (function(module, exports) {

[].forEach.call(document.querySelectorAll('.js__phone'), function (input) {
  var keyCode;

  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    var pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = new_value.indexOf("_");

    if (i !== -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i);
    }

    var reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
      return "\\d{1," + a.length + "}";
    }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
    if (event.type === "blur" && this.value.length < 5) this.value = "";
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false);
});

 }),
 (function(module, exports) {

$(document).ready(function () {
  $('.form-validate').validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      },
      acceptAgreement: {
        required: true
      },
      phone: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      acceptAgreement: {
        required: "Вы должны согласиться на обработку персональных данных"
      },
      phone: {
        required: "Введите номер телефона",
        minlength: "Пожалуйста, введите не менее 10 символов"
      }
    }
  });
  $('.form-validate-second').validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      },
      acceptAgreement: {
        required: true
      },
      phone: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      acceptAgreement: {
        required: "Вы должны согласиться на обработку персональных данных"
      },
      phone: {
        required: "Введите номер телефона",
        minlength: "Пожалуйста, введите не менее 10 символов"
      }
    }
  });
});

 }),
 (function(module, exports) {

var dropdown = '.js__dropdown',
    dropdownActive = 'dropdown-active',
    dropdownToggle = '.js__dropdown-toggle';
$(document).ready(function () {
  $(dropdownToggle).click(function () {
    if (!$(this).hasClass(dropdownActive)) {
      $('.js__dropdown-toggle.dropdown-active').removeClass(dropdownActive);
      $(this).addClass(dropdownActive);
    } else {
      $(this).removeClass(dropdownActive);
    }
  });
});
$(document).mouseup(function (e) {
  if (!$(dropdown).is(e.target) && $(dropdown).has(e.target).length === 0) {
    $(dropdownToggle).removeClass(dropdownActive);
  }
});

 }),
 (function(module, exports) {

$(document).ready(function () {
  var asideRules = '#aside-rules',
      asideHelp = '#aside-help';
  $('.js__aside-rules').click(function () {
    $(asideRules).removeClass('d-none');
    $(asideHelp).addClass('d-none');
  });
  $('.js__aside-help').click(function () {
    $(asideHelp).removeClass('d-none');
    $(asideRules).addClass('d-none');
  });


  var toggleMoreShow = ".toggle-more-show",
      toggleMoreCollapse = ".toggle-more-collapse",
      showMoreCount = 3,
      allItems = $(".toggle-more-item").length;
  $('.toggle-more-list').each(function () {
    $(this).find(toggleMoreCollapse).hide();
    $(this).find('.toggle-more-item').slice(showMoreCount, allItems).hide().addClass('is-hidden');
  });
  $(toggleMoreShow).on('click', function () {
    var thx = $(this).parents('.toggle-more-list');
    var colItems = thx.find(".toggle-more-item.is-hidden").length;

    if (colItems) {
      thx.find(".toggle-more-item.is-hidden").slice(0, showMoreCount).slideDown().removeClass('is-hidden');
      thx.find(toggleMoreCollapse).fadeIn();
    }

    if (colItems <= showMoreCount) {
      thx.find(toggleMoreShow).hide();
    }
  });
  $(toggleMoreCollapse).on('click', function () {
    var thx = $(this).parents('.toggle-more-list');
    thx.find(".toggle-more-item").slice(showMoreCount, allItems).slideUp().addClass('is-hidden');
    thx.find(toggleMoreShow).show();
    thx.find(toggleMoreCollapse).hide();
  });


  $('.js__go-anchor').on('click', function (e) {
    e.preventDefault();
    var fixed_offset = 90;
    $('html, body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 900);
  });


  var ratingReviewItem = '.rating-review-item';
  var ratingReviewActive = 'rating-review-active';
  $('.rating-review').on('click', ratingReviewItem, function () {
    $(this).parent().removeClass('rating-review__no-rade');

    if ($(ratingReviewItem).hasClass(ratingReviewActive)) {
      $(ratingReviewItem).removeClass(ratingReviewActive);
    }

    $(this).addClass(ratingReviewActive);
    $('.js__rating-review').removeClass('disabled');
  });


  $('.js__estimate').on('click', '.estimate-item', function () {
    $(this).toggleClass('estimate-item__active');

    if ($('.estimate-item').hasClass('estimate-item__active')) {
      $('.js__rating-estimate').removeClass('disabled');
    } else {
      $('.js__rating-estimate').addClass('disabled');
    }
  });


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


  $('.js-amount-plus').click(function () {
    var input = $(this).prev();
    input.val(parseInt(input.val()) + 1).change();
  });
  $('.js-amount-minus').click(function () {
    var input = $(this).next();

    if (input.val() > 0) {
      input.val(parseInt(input.val()) - 1).change();
    }
  });
});

 }),
 (function(module, exports) {

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

 }),
,
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 var _general_snippet_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
 var _general_snippet_tab__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_general_snippet_tab__WEBPACK_IMPORTED_MODULE_0__);
 var _general_snippet_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
 var _general_snippet_login__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_general_snippet_login__WEBPACK_IMPORTED_MODULE_1__);
 var _general_snippet_mask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
 var _general_snippet_mask__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(_general_snippet_mask__WEBPACK_IMPORTED_MODULE_2__);
 var _general_snippet_form_validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
 var _general_snippet_form_validate__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(_general_snippet_form_validate__WEBPACK_IMPORTED_MODULE_3__);
 var _general_snippet_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
 var _general_snippet_dropdown__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(_general_snippet_dropdown__WEBPACK_IMPORTED_MODULE_4__);
 var _general_snippet_common_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
 var _general_snippet_common_js__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(_general_snippet_common_js__WEBPACK_IMPORTED_MODULE_5__);
 var _snippets_mobile_header_toggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);
 var _snippets_mobile_header_toggle__WEBPACK_IMPORTED_MODULE_6___default = __webpack_require__.n(_snippets_mobile_header_toggle__WEBPACK_IMPORTED_MODULE_6__);







$(document).ready(function () {
  $('.js__search').click(function () {
    $('body').addClass('search-panel__active');
  });
  $('.js__nav-catalog-btn').click(function () {
    $('body').addClass('menu-open');
    $('.nav-catalog-panel').addClass('nav-catalog-opened');
    $('.header-toggle').toggleClass('icon-menu icon-close');
    $('.darkening-layer').fadeIn();
  });
  $('.search-form-box__back').click(function () {
    $('body').removeClass('search-panel__active');
    searchResult.removeClass('active');
    searchFormBoxInput.val('');
  });

  var searchFormBoxInput = $('.search-form-box__input'),
      searchResult = $('.search-result');
  searchFormBoxInput.keyup(function () {
    var value = $(this).val().length;
    $('body').addClass('search-panel__active');

    if (value >= 2) {
      searchResult.addClass('active');
    } else {
      searchResult.removeClass('active');
    }
  });


  $('.accordion-light__head').click(function () {
    $(this).toggleClass('accordion-light__active').next().slideToggle();
  });


  $('.nav-catalog-dropdown__close').click(function () {
    $(this).closest('.js__tab-box').removeClass('active');
  });


  $('.catalog-widget__title').on('click', function () {
    $(this).toggleClass('catalog-widget__active');
    $(this).next().slideToggle();
  });
  $('.catalog-widget__clear').on('click', function () {
    $(this).closest('.catalog-widget__body').find('.custom-control-input').prop('checked', false).change();
    var countChecked = $('.catalog-filter').find('.custom-control-input:checked').length;

    if (countChecked < 1) {
      $(catalogFilter).removeClass('catalog-filter__show');
    }
  });
  var catalogFilter = '.catalog-filter';
  $('.catalog-widget__group').on('click', function () {
    if ($(".catalog-widget__group .custom-control-input").is(":checked")) {
      $(catalogFilter).addClass('catalog-filter__show');
    } else {
      $(catalogFilter).removeClass('catalog-filter__show');
    }
  });
  $('.filter-panel__choose').click(function () {
    $('.catalog-filter').addClass('catalog-filter__opened');
  });
  $('.catalog-filter__clear-all').click(function () {
    $('.catalog-filter .custom-control-input').prop('checked', false);
    $('.catalog-filter').removeClass('catalog-filter__show');
  });
  $('.js__catalog-filter--show').click(function () {
    $('body').addClass('filter-panel__open');
  });
  $('.js__catalog-filter__close').click(function () {
    $('body').removeClass('filter-panel__open');
  });


  var jsBackPanelEl = '.js__back-panel__el',
      jsCloseCalendarPanel = 'js__close-calendar-panel',
      calendarPanelOpen = 'calendar-panel-open';
  $('#ordering-event').datepicker({
    showOtherMonths: true,
    onSelect: function onSelect(dateText) {
      $('.js__select-date').val(dateText);
      $('body').removeClass(calendarPanelOpen);
      $(jsBackPanelEl).removeClass(jsCloseCalendarPanel);
    }
  });
  $('.js__select-date').on('click', function () {
    $('body').addClass(calendarPanelOpen);
    $(jsBackPanelEl).addClass(jsCloseCalendarPanel);
  });
  $('.back-panel').on('click', '.js__close-calendar-panel', function (e) {
    e.preventDefault();
    $('body').removeClass(calendarPanelOpen);
    $(this).removeClass(jsCloseCalendarPanel);
  });


  $('.js__enter-promo-code').click(function () {
    $('.js__personal-area-discount').fadeIn();
    $(this).fadeOut();
  });
  $('.js__cancel-promo-code').click(function () {
    $(this).closest('.js__personal-area-discount').fadeOut();
    $('.js__enter-promo-code').fadeIn();
  });
  $('.js__delete-promo-code').click(function () {
    $(this).parent().fadeOut();
  });


  $('.detail-gallery__carousel').slick({
    prevArrow: '<button type="button" class="control-arrow control-arrow__prev btn-circle btn-circle__small slick-prev"><span class="icon-arrow-left btn-text"></span></button>',
    nextArrow: '<button type="button" class="control-arrow control-arrow__next btn-circle btn-circle__small slick-next"><span class="icon-arrow-right btn-text"></span></button>'
  });


  $('#detail-event').datepicker({
    showOtherMonths: true,
    onSelect: function onSelect(dateText) {
      $('.js__detail-calendar').val(dateText);
    }
  });
});

 })
 ]);