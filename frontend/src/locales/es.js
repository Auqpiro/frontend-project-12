const es = {
  translation: {
    brand: 'Hexlet Chat',
    signin: {
      header: 'Iniciar sesión',
      username: 'Nombre de usuario',
      password: 'Contraseña',
      submit: 'Iniciar sesión',
      error: 'Nombre de usuario o contraseña no válidos',
      footer: {
        message: '¿No tienes una cuenta?',
        link: 'Inscribirse',
      },
    },
    signup: {
      header: 'Inscribirse',
      username: 'Nombre de usuario',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      submit: 'Inscribirse',
      error: 'El usuario con los mismos datos ya existe',
      rules: {
        required: 'Campo obligatorio',
        username: '3 hasta 20 carácteres',
        password: 'Mínimo 6 carácteres',
        confirmPassword: 'Las contraseñas deben coincidir',
      },
    },
    logout: 'Cerrar sesión',
    channels: {
      header: 'Chats',
      dropdown: {
        rename: 'Renombrar',
        remove: 'Eliminar',
      },
    },
    messages: {
      counter: {
        count_one: '{{count}} mensaje',
        count_other: '{{count}} mensajes',
      },
      label: 'Escribe un mensaje...',
      send: 'Enviar',
    },
    modals: {
      headers: {
        add: 'Agregar un chat',
        rename: 'Cambiar el nombre del chat',
        remove: 'Eliminar el chat',
      },
      buttons: {
        cancel: 'Cancelar',
        submit: 'Enviar',
        delete: 'Eliminar',
      },
      concern: '¿Está seguro?',
      rules: {
        required: 'Campo obligatorio',
        name: '3 hasta 20 carácteres',
        uniq: 'Tiene que ser única',
      },
    },
    toast: {
      network: 'Error de conexión',
      add: 'Su chat fue creado',
      rename: 'Su chat fue renombrado',
      remove: 'Su chat fue eliminado',
    },
    notFound: {
      header: 'Página no encontrada',
      message: 'Puede acceder a la página principal',
      link: 'la página principal',
    },
  },
};

export default es;