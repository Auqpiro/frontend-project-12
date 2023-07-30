const en = {
  translation: {
    brand: 'Hexlet Chat',
    signin: {
      header: 'Log in',
      username: 'Username',
      password: 'Password',
      submit: 'Sign in',
      error: 'The username or password is incorrect',
      footer: {
        message: "Don't have an account?",
        link: 'Registration',
      },
    },
    signup: {
      header: 'Registration',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm the password',
      submit: 'Sign up',
      error: 'This username is already exist',
      rules: {
        required: 'Required',
        username: '3 to 20 characters',
        password: 'At least 6 characters',
        confirmPassword: 'Passwords must match',
      },
    },
    logout: 'Log out',
    channels: {
      header: 'Chats',
      dropdown: {
        rename: 'Rename',
        remove: 'Remove',
      },
    },
    messages: {
      counter: {
        count_one: '{{count}} message',
        count_other: '{{count}} messages',
      },
      label: 'Text your message...',
      send: 'Send',
    },
    modals: {
      headers: {
        add: 'Add channel',
        rename: 'Rename channel',
        remove: 'Remove channel',
      },
      buttons: {
        cancel: 'Cancel',
        submit: 'Send',
        delete: 'Delete',
      },
      concern: 'Are you sure?',
      rules: {
        required: 'Required',
        name: '3 to 20 characters',
        uniq: 'Must be unique',
      },
    },
    toast: {
      network: 'Connection error',
      add: 'Channel’s created',
      rename: 'Channel’s renamed',
      remove: 'Channel’s  deleted',
    },
    notFound: {
      header: 'Page not found',
      message: 'You can go',
      link: 'to homepage',
    },
  },
};

export default en;
