/* BEGIN: Раскрываем и сворачиваем список dropdown */
let dropdown = '.js__dropdown',
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
/* END */
