let modalLogin = '#modal-login',
  modalForgot = '#modal-form-forgot',
  modalRegister = '#modal-form-register',
  modalLogin__org = '#modal-login__org',
  modalForgot__org = '#modal-form-forgot__org',
  modalRegister__org = '#modal-form-register__org';

$(document).ready(function () {
  /* BEGIN: For logic on modals login, forgot and register */
  let bodyEl = $('body');
  $('.js__auth').click(function () {

    $(this).closest('.modal').fadeOut();

    setTimeout(function () {
      if (!bodyEl.hasClass('modal-open')) {
        bodyEl.addClass('modal-open');
      }
    }, 400);

  });

  let hash = window.location.hash;

  if (hash === modalForgot || hash === '/#modal-forgot') {
    $('#modal-forgot__org').modal('show')
  } else if (hash === modalLogin || hash === '/#modal-login') {
    $('#modal-auth__org').modal('show');
  } else if (hash === modalRegister || hash === '/#modal-register') {
    $('#modal-register__org').modal('show');
  }
  /* END */


  /* BEGIN: Валидация инпут полей */
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
  /* END */
});
