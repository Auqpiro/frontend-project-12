const ru = {
  translation: {
    brand: 'Hexlet Chat',
    signin: {
      header: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      error: 'Неверные имя пользователя или пароль',
      footer: {
        message: 'Нет аккаунта?',
        link: 'Регистрация',
      },
    },
    signup: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      error: 'Такой пользователь уже существует',
      rules: {
        required: 'Обязательное поле',
        username: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
      },
    },
    logout: 'Выйти',
    channels: {
      header: 'Каналы',
      dropdown: {
        rename: 'Переименовать',
        remove: 'Удалить',
      },
    },
    messages: {
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      label: 'Введите сообщение...',
      send: 'Отправить',
    },
    modals: {
      headers: {
        add: 'Добавить канал',
        rename: 'Переименовать канал',
        remove: 'Удалить канал',
      },
      buttons: {
        cancel: 'Отменить',
        submit: 'Отправить',
        delete: 'Удалить',
      },
      concern: 'Уверены?',
      rules: {
        required: 'Обязательное поле',
        name: 'От 3 до 20 символов',
        uniq: 'Должно быть уникальным',
      },
    },
    toast: {
      network: 'Ошибка соединения',
      add: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удалён',
    },
    notFound: {
      header: 'Страница не найдена',
      message: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
  },
};

export default ru;
