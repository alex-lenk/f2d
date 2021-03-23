/*
 * jQuery Form Styler v2.0.2
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2017 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2017.10.22
 *
 */

;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory($ || require('jquery'));
  } else {
    factory(jQuery);
  }
}(function ($) {

  'use strict';

  let pluginName = 'styler',
    defaults = {
      idSuffix: '-styler',
      filePlaceholder: 'Файл не выбран',
      fileBrowse: 'Обзор...',
      fileNumber: 'Выбрано файлов: %s',
      selectPlaceholder: 'Выберите...',
      selectSearch: false,
      selectSearchLimit: 10,
      selectSearchNotFound: 'Совпадений не найдено',
      selectSearchPlaceholder: 'Поиск...',
      selectVisibleOptions: 0,
      selectSmartPositioning: true,
      locale: 'ru',
      locales: {
        'en': {
          filePlaceholder: 'No file selected',
          fileBrowse: 'Browse...',
          fileNumber: 'Selected files: %s',
          selectPlaceholder: 'Select...',
          selectSearchNotFound: 'No matches found',
          selectSearchPlaceholder: 'Search...'
        }
      },
      onSelectOpened: function () {
      },
      onSelectClosed: function () {
      },
      onFormStyled: function () {
      }
    };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    let locale = this.options.locale;
    if (this.options.locales[locale] !== undefined) {
      $.extend(this.options, this.options.locales[locale]);
    }
    this.init();
  }

  Plugin.prototype = {

    // инициализация
    init: function () {

      let el = $(this.element);
      let opt = this.options;

      let iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
      let Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

      function Attributes() {
        if (el.attr('id') !== undefined && el.attr('id') !== '') {
          this.id = el.attr('id') + opt.idSuffix;
        }
        this.title = el.attr('title');
        this.classes = el.attr('class');
        this.data = el.data();
      }

      // file
      if (el.is(':file')) {

        let fileOutput = function () {

          let att = new Attributes();
          let placeholder = el.data('placeholder');
          if (placeholder === undefined) placeholder = opt.filePlaceholder;
          let browse = el.data('browse');
          if (browse === undefined || browse === '') browse = opt.fileBrowse;

          let file =
            $('<div class="jq-file">' +
              '<div class="jq-file__name">' + placeholder + '</div>' +
              '<div class="jq-file__browse">' + browse + '</div>' +
              '</div>')
              .attr({
                id: att.id,
                title: att.title
              })
              .addClass(att.classes)
              .data(att.data);

          el.after(file).appendTo(file);
          if (el.is(':disabled')) file.addClass('disabled');

          let value = el.val();
          let name = $('div.jq-file__name', file);

          // чтобы при динамическом изменении имя файла не сбрасывалось
          if (value) name.text(value.replace(/.+[\\\/]/, ''));

          el.on('change.styler', function () {
            let value = el.val();
            if (el.is('[multiple]')) {
              value = '';
              let files = el[0].files.length;
              if (files > 0) {
                let number = el.data('number');
                if (number === undefined) number = opt.fileNumber;
                number = number.replace('%s', files);
                value = number;
              }
            }
            name.text(value.replace(/.+[\\\/]/, ''));
            if (value === '') {
              name.text(placeholder);
              file.removeClass('changed');
            } else {
              file.addClass('changed');
            }
          })
            .on('focus.styler', function () {
              file.addClass('focused');
            })
            .on('blur.styler', function () {
              file.removeClass('focused');
            })
            .on('click.styler', function () {
              file.removeClass('focused');
            });

        }; // end fileOutput()

        fileOutput();

        // обновление при динамическом изменении
        el.on('refresh', function () {
          el.off('.styler').parent().before(el).remove();
          fileOutput();
        });

        // end file

        // select
      } else if (el.is('select')) {

        let selectboxOutput = function () {

          // запрещаем прокрутку страницы при прокрутке селекта
          function preventScrolling(selector) {

            let scrollDiff = selector.prop('scrollHeight') - selector.outerHeight(),
              wheelDelta = null,
              scrollTop = null;

            selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function (e) {

              /**
               * нормализация направления прокрутки
               * (firefox < 0 || chrome etc... > 0)
               * (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0)
               */
              wheelDelta = (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) ? 1 : -1; // направление прокрутки (-1 вниз, 1 вверх)
              scrollTop = selector.scrollTop(); // позиция скролла

              if ((scrollTop >= scrollDiff && wheelDelta < 0) || (scrollTop <= 0 && wheelDelta > 0)) {
                e.stopPropagation();
                e.preventDefault();
              }

            });
          }

          let option = $('option', el);
          let list = '';

          // формируем список селекта
          function makeList() {
            for (let i = 0; i < option.length; i++) {
              let op = option.eq(i);
              let li = '',
                liClass = '',
                liClasses = '',
                id = '',
                title = '',
                dataList = '',
                optionClass = '',
                optgroupClass = '',
                dataJqfsClass = '';
              let disabled = 'disabled';
              let selDis = 'selected sel disabled';
              if (op.prop('selected')) liClass = 'selected sel';
              if (op.is(':disabled')) liClass = disabled;
              if (op.is(':selected:disabled')) liClass = selDis;
              if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
              if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
              if (op.attr('class') !== undefined) {
                optionClass = ' ' + op.attr('class');
                dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
              }

              let data = op.data();
              for (let k in data) {
                if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
              }

              if ((liClass + optionClass) !== '') liClasses = ' class="' + liClass + optionClass + '"';
              li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>' + op.html() + '</li>';

              // если есть optgroup
              if (op.parent().is('optgroup')) {
                if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
                li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>' + op.html() + '</li>';
                if (op.is(':first-child')) {
                  li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
                }
              }

              list += li;
            }
          } // end makeList()

          // одиночный селект
          function doSelect() {

            let att = new Attributes();
            let searchHTML = '';
            let selectPlaceholder = el.data('placeholder');
            let selectSearch = el.data('search');
            let selectSearchLimit = el.data('search-limit');
            let selectSearchNotFound = el.data('search-not-found');
            let selectSearchPlaceholder = el.data('search-placeholder');
            let selectSmartPositioning = el.data('smart-positioning');

            if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
            if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
            if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
            if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
            if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
            if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;

            let selectbox =
              $('<div class="jq-selectbox jqselect">' +
                '<div class="jq-selectbox__select icon-arrow-right">' +
                '<div class="jq-selectbox__select-text"></div>' +
                '</div>' +
                '</div>')
                .attr({
                  id: att.id,
                  title: att.title
                })
                .addClass(att.classes)
                .data(att.data)
            ;

            el.after(selectbox).prependTo(selectbox);

            let selectzIndex = selectbox.css('z-index');
            selectzIndex = (selectzIndex > 0) ? selectzIndex : 1;
            let divSelect = $('div.jq-selectbox__select', selectbox);
            let divText = $('div.jq-selectbox__select-text', selectbox);
            let optionSelected = option.filter(':selected');

            makeList();

            if (selectSearch) searchHTML =
              '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
              '<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
            let dropdown =
              $('<div class="jq-selectbox__dropdown">' +
                searchHTML + '<ul>' + list + '</ul>' +
                '</div>');
            selectbox.append(dropdown);
            let ul = $('ul', dropdown);
            let li = $('li', dropdown);
            let search = $('input', dropdown);
            let notFound = $('div.jq-selectbox__not-found', dropdown).hide();
            if (li.length < selectSearchLimit) search.parent().hide();

            // показываем опцию по умолчанию
            // если у 1-й опции нет текста, она выбрана по умолчанию и параметр selectPlaceholder не false, то показываем плейсхолдер
            if (option.first().text() === '' && option.first().is(':selected') && selectPlaceholder !== false) {
              divText.text(selectPlaceholder).addClass('placeholder');
            } else {
              divText.text(optionSelected.text());
            }

            // определяем самый широкий пункт селекта
            let liWidthInner = 0,
              liWidth = 0;
            li.css({'display': 'inline-block'});
            li.each(function () {
              let l = $(this);
              if (l.innerWidth() > liWidthInner) {
                liWidthInner = l.innerWidth();
                liWidth = l.width();
              }
            });
            li.css({'display': ''});

            // подстраиваем ширину свернутого селекта в зависимости
            // от ширины плейсхолдера или самого широкого пункта
            if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
              divText.width(divText.width());
            } else {
              let selClone = selectbox.clone().appendTo('body').width('auto');
              let selCloneWidth = selClone.outerWidth();
              selClone.remove();
              if (selCloneWidth === selectbox.outerWidth()) {
                divText.width(liWidth);
              }
            }

            // подстраиваем ширину выпадающего списка в зависимости от самого широкого пункта
            if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);

            // прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
            // если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
            if (option.first().text() === '' && el.data('placeholder') !== '') {
              li.first().hide();
            }

            let selectHeight = selectbox.outerHeight(true);
            let searchHeight = search.parent().outerHeight(true) || 0;
            let isMaxHeight = ul.css('max-height');
            let liSelected = li.filter('.selected');
            if (liSelected.length < 1) li.first().addClass('selected sel');
            if (li.data('li-height') === undefined) {
              let liOuterHeight = li.outerHeight();
              if (selectPlaceholder !== false) liOuterHeight = li.eq(1).outerHeight();
              li.data('li-height', liOuterHeight);
            }
            let position = dropdown.css('top');
            if (dropdown.css('left') === 'auto') dropdown.css({left: 0});
            if (dropdown.css('top') === 'auto') {
              dropdown.css({top: selectHeight});
              position = selectHeight;
            }
            dropdown.hide();

            // если выбран не дефолтный пункт
            if (liSelected.length) {
              // добавляем класс, показывающий изменение селекта
              if (option.first().text() !== optionSelected.text()) {
                selectbox.addClass('changed');
              }
              // передаем селекту класс выбранного пункта
              selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
              selectbox.addClass(liSelected.data('jqfs-class'));
            }

            // если селект неактивный
            if (el.is(':disabled')) {
              selectbox.addClass('disabled');
              return false;
            }

            // при клике на псевдоселекте
            divSelect.click(function () {

              // колбек при закрытии селекта
              if ($('div.jq-selectbox').filter('.opened').length) {
                opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
              }

              el.focus();

              // если iOS, то не показываем выпадающий список,
              // т.к. отображается нативный и неизвестно, как его спрятать
              if (iOS) return;

              // умное позиционирование
              let win = $(window);
              let liHeight = li.data('li-height');
              let topOffset = selectbox.offset().top;
              let bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
              let visible = el.data('visible-options');
              if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
              let minHeight = liHeight * 5;
              let newHeight = liHeight * visible;
              if (visible > 0 && visible < 6) minHeight = newHeight;
              if (visible === 0) newHeight = 'auto';

              let dropDown = function () {
                dropdown.height('auto').css({bottom: 'auto', top: position});
                let maxHeightBottom = function () {
                  ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
                };
                maxHeightBottom();
                ul.css('max-height', newHeight);
                if (isMaxHeight !== 'none') {
                  ul.css('max-height', isMaxHeight);
                }
                if (bottomOffset < (dropdown.outerHeight() + 20)) {
                  maxHeightBottom();
                }
              };

              let dropUp = function () {
                dropdown.height('auto').css({top: 'auto', bottom: position});
                let maxHeightTop = function () {
                  ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
                };
                maxHeightTop();
                ul.css('max-height', newHeight);
                if (isMaxHeight !== 'none') {
                  ul.css('max-height', isMaxHeight);
                }
                if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
                  maxHeightTop();
                }
              };

              if (selectSmartPositioning === true || selectSmartPositioning === 1) {
                // раскрытие вниз
                if (bottomOffset > (minHeight + searchHeight + 20)) {
                  dropDown();
                  selectbox.removeClass('dropup').addClass('drop-down');
                  // раскрытие вверх
                } else {
                  dropUp();
                  selectbox.removeClass('drop-down').addClass('dropup');
                }
              } else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
                // раскрытие вниз
                if (bottomOffset > (minHeight + searchHeight + 20)) {
                  dropDown();
                  selectbox.removeClass('dropup').addClass('drop-down');
                }
              } else {
                // если умное позиционирование отключено
                dropdown.height('auto').css({bottom: 'auto', top: position});
                ul.css('max-height', newHeight);
                if (isMaxHeight !== 'none') {
                  ul.css('max-height', isMaxHeight);
                }
              }

              // если выпадающий список выходит за правый край окна браузера,
              // то меняем позиционирование с левого на правое
              if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
                dropdown.css({left: 'auto', right: 0});
              }
              // конец умного позиционирования

              $('div.jqselect').css({zIndex: (selectzIndex - 1)}).removeClass('opened');
              selectbox.css({zIndex: selectzIndex});
              if (dropdown.is(':hidden')) {
                $('div.jq-selectbox__dropdown:visible').hide();
                dropdown.show();
                selectbox.addClass('opened focused');
                // колбек при открытии селекта
                opt.onSelectOpened.call(selectbox);
              } else {
                dropdown.hide();
                selectbox.removeClass('opened dropup drop-down');
                // колбек при закрытии селекта
                if ($('div.jq-selectbox').filter('.opened').length) {
                  opt.onSelectClosed.call(selectbox);
                }
              }

              // поисковое поле
              if (search.length) {
                search.val('').keyup();
                notFound.hide();
                search.keyup(function () {
                  let query = $(this).val();
                  li.each(function () {
                    if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
                      $(this).hide();
                    } else {
                      $(this).show();
                    }
                  });
                  // прячем 1-ю пустую опцию
                  if (option.first().text() === '' && el.data('placeholder') !== '') {
                    li.first().hide();
                  }
                  if (li.filter(':visible').length < 1) {
                    notFound.show();
                  } else {
                    notFound.hide();
                  }
                });
              }

              // прокручиваем до выбранного пункта при открытии списка
              if (li.filter('.selected').length) {
                if (el.val() === '') {
                  ul.scrollTop(0);
                } else {
                  // если нечетное количество видимых пунктов,
                  // то высоту пункта делим пополам для последующего расчета
                  if ((ul.innerHeight() / liHeight) % 2 !== 0) liHeight = liHeight / 2;
                  ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
                }
              }

              preventScrolling(ul);

            }); // end divSelect.click()

            // при наведении курсора на пункт списка
            li.hover(function () {
              $(this).siblings().removeClass('selected');
            });
            let selectedText = li.filter('.selected').text();

            // при клике на пункт списка
            li.filter(':not(.disabled):not(.optgroup)').click(function () {
              el.focus();
              let t = $(this);
              let liText = t.text();
              if (!t.is('.selected')) {
                let index = t.index();
                index -= t.prevAll('.optgroup').length;
                t.addClass('selected sel').siblings().removeClass('selected sel');
                option.prop('selected', false).eq(index).prop('selected', true);
                selectedText = liText;
                divText.text(liText);

                // передаем селекту класс выбранного пункта
                if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
                selectbox.data('jqfs-class', t.data('jqfs-class'));
                selectbox.addClass(t.data('jqfs-class'));

                el.change();
              }
              dropdown.hide();
              selectbox.removeClass('opened dropup drop-down');
              // колбек при закрытии селекта
              opt.onSelectClosed.call(selectbox);

            });
            dropdown.mouseout(function () {
              $('li.sel', dropdown).addClass('selected');
            });

            // изменение селекта
            el.on('change.styler', function () {
              divText.text(option.filter(':selected').text()).removeClass('placeholder');
              li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
              // добавляем класс, показывающий изменение селекта
              if (option.first().text() !== li.filter('.selected').text()) {
                selectbox.addClass('changed');
              } else {
                selectbox.removeClass('changed');
              }
            })
              .on('focus.styler', function () {
                selectbox.addClass('focused');
                $('div.jqselect').not('.focused').removeClass('opened dropup drop-down').find('div.jq-selectbox__dropdown').hide();
              })
              .on('blur.styler', function () {
                selectbox.removeClass('focused');
              })
              // изменение селекта с клавиатуры
              .on('keydown.styler keyup.styler', function (e) {
                let liHeight = li.data('li-height');
                if (el.val() === '') {
                  divText.text(selectPlaceholder).addClass('placeholder');
                } else {
                  divText.text(option.filter(':selected').text());
                }
                li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
                // вверх, влево, Page Up, Home
                if (e.which === 38 || e.which === 37 || e.which === 33 || e.which === 36) {
                  if (el.val() === '') {
                    ul.scrollTop(0);
                  } else {
                    ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
                  }
                }
                // вниз, вправо, Page Down, End
                if (e.which === 40 || e.which === 39 || e.which === 34 || e.which === 35) {
                  ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
                }
                // закрываем выпадающий список при нажатии Enter
                if (e.which === 13) {
                  e.preventDefault();
                  dropdown.hide();
                  selectbox.removeClass('opened dropup drop-down');
                  // колбек при закрытии селекта
                  opt.onSelectClosed.call(selectbox);
                }
              }).on('keydown.styler', function (e) {
              // открываем выпадающий список при нажатии Space
              if (e.which === 32) {
                e.preventDefault();
                divSelect.click();
              }
            });

            // прячем выпадающий список при клике за пределами селекта
            if (!onDocumentClick.registered) {
              $(document).on('click', onDocumentClick);
              onDocumentClick.registered = true;
            }

          } // end doSelect()

          // мультиселект
          function doMultipleSelect() {

            let att = new Attributes();
            let selectbox =
              $('<div class="jq-select-multiple jqselect"></div>')
                .attr({
                  id: att.id,
                  title: att.title
                })
                .addClass(att.classes)
                .data(att.data)
            ;

            el.after(selectbox);

            makeList();
            selectbox.append('<ul>' + list + '</ul>');
            let ul = $('ul', selectbox);
            let li = $('li', selectbox);
            let size = el.attr('size');
            let ulHeight = ul.outerHeight();
            let liHeight = li.outerHeight();
            if (size !== undefined && size > 0) {
              ul.css({'height': liHeight * size});
            } else {
              ul.css({'height': liHeight * 4});
            }
            if (ulHeight > selectbox.height()) {
              ul.css('overflowY', 'scroll');
              preventScrolling(ul);
              // прокручиваем до выбранного пункта
              if (li.filter('.selected').length) {
                ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
              }
            }

            // прячем оригинальный селект
            el.prependTo(selectbox);

            // если селект неактивный
            if (el.is(':disabled')) {
              selectbox.addClass('disabled');
              option.each(function () {
                if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
              });

              // если селект активный
            } else {

              // при клике на пункт списка
              li.filter(':not(.disabled):not(.optgroup)').click(function (e) {
                el.focus();
                let clkd = $(this);
                if (!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
                if (!e.shiftKey) clkd.addClass('first');
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

                // выделение пунктов при зажатом Ctrl
                if (e.ctrlKey || e.metaKey) {
                  if (clkd.is('.selected')) clkd.removeClass('selected first');
                  else clkd.addClass('selected first');
                  clkd.siblings().removeClass('first');
                }

                // выделение пунктов при зажатом Shift
                if (e.shiftKey) {
                  let prev = false,
                    next = false;
                  clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
                  clkd.prevAll().each(function () {
                    if ($(this).is('.first')) prev = true;
                  });
                  clkd.nextAll().each(function () {
                    if ($(this).is('.first')) next = true;
                  });
                  if (prev) {
                    clkd.prevAll().each(function () {
                      if ($(this).is('.selected')) return false;
                      else $(this).not('.disabled, .optgroup').addClass('selected');
                    });
                  }
                  if (next) {
                    clkd.nextAll().each(function () {
                      if ($(this).is('.selected')) return false;
                      else $(this).not('.disabled, .optgroup').addClass('selected');
                    });
                  }
                  if (li.filter('.selected').length === 1) clkd.addClass('first');
                }

                // отмечаем выбранные мышью
                option.prop('selected', false);
                li.filter('.selected').each(function () {
                  let t = $(this);
                  let index = t.index();
                  if (t.is('.option')) index -= t.prevAll('.optgroup').length;
                  option.eq(index).prop('selected', true);
                });
                el.change();

              });

              // отмечаем выбранные с клавиатуры
              option.each(function (i) {
                $(this).data('optionIndex', i);
              });
              el.on('change.styler', function () {
                li.removeClass('selected');
                let arrIndexes = [];
                option.filter(':selected').each(function () {
                  arrIndexes.push($(this).data('optionIndex'));
                });
                li.not('.optgroup').filter(function (i) {
                  return $.inArray(i, arrIndexes) > -1;
                }).addClass('selected');
              })
                .on('focus.styler', function () {
                  selectbox.addClass('focused');
                })
                .on('blur.styler', function () {
                  selectbox.removeClass('focused');
                });

              // прокручиваем с клавиатуры
              if (ulHeight > selectbox.height()) {
                el.on('keydown.styler', function (e) {
                  // вверх, влево, PageUp
                  if (e.which === 38 || e.which === 37 || e.which === 33) {
                    ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
                  }
                  // вниз, вправо, PageDown
                  if (e.which === 40 || e.which === 39 || e.which === 34) {
                    ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
                  }
                });
              }

            }
          } // end doMultipleSelect()

          if (el.is('[multiple]')) {

            // если Android или iOS, то мультиселект не стилизуем
            // причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
            // причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
            if (Android || iOS) return;

            doMultipleSelect();
          } else {
            doSelect();
          }

        }; // end selectboxOutput()

        selectboxOutput();

        // обновление при динамическом изменении
        el.on('refresh', function () {
          el.off('.styler').parent().before(el).remove();
          selectboxOutput();
        });

        // end select

        // reset
      } else if (el.is(':reset')) {
        el.on('click', function () {
          setTimeout(function () {
            el.closest('form').find('input, select').trigger('refresh');
          }, 1);
        });
      } // end reset

    }, // init: function()

    // деструктор
    destroy: function () {

      let el = $(this.element);

      if (el.is(':file') || el.is('select')) {
        el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
      }

    } // destroy: function()

  }; // Plugin.prototype

  $.fn[pluginName] = function (options) {
    let args = arguments;
    if (options === undefined || typeof options === 'object') {
      this.each(function () {
        if (!$.data(this, '_' + pluginName)) {
          $.data(this, '_' + pluginName, new Plugin(this, options));
        }
      })
        // колбек после выполнения плагина
        .promise()
        .done(function () {
          let opt = $(this[0]).data('_' + pluginName);
          if (opt) opt.options.onFormStyled.call();
        });
      return this;
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      let returns;
      this.each(function () {
        let instance = $.data(this, '_' + pluginName);
        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });
      return returns !== undefined ? returns : this;
    }
  };

  // прячем выпадающий список при клике за пределами селекта
  function onDocumentClick(e) {
    // e.target.nodeName !== 'OPTION' - добавлено для обхода бага в Opera на движке Presto
    // (при изменении селекта с клавиатуры срабатывает событие onclick)
    if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName !== 'OPTION') {
      if ($('.jq-selectbox.opened').length) {
        let selectbox = $('div.jq-selectbox.opened'),
          search = $('.jq-selectbox__search input', selectbox),
          dropdown = $('.jq-selectbox__dropdown', selectbox),
          opt = selectbox.find('select').data('_' + pluginName).options;

        // колбек при закрытии селекта
        opt.onSelectClosed.call(selectbox);

        if (search.length) search.val('').keyup();
        dropdown.hide().find('li.sel').addClass('selected');
        selectbox.removeClass('focused opened dropup drop-down');
      }
    }
  }

  onDocumentClick.registered = false;

}));
