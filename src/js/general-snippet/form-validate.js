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
