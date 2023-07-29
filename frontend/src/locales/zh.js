const zh = {
  translation: {
    brand: 'Hexlet聊天室',
    signin: {
      header: '注册',
      username: '网络名字',
      password: '密码',
      submit: '注册',
      error: '错误的用户名或密码',
      footer: {
        message: '没有帐号吗?',
        link: '登录',
      },
    },
    signup: {
      header: '登录',
      username: '网络名字',
      password: '密码',
      confirmPassword: '确认密码',
      submit: '登录',
      error: '这样的用户已经存在了',
      rules: {
        required: '必须的',
        username: '3到20个字符',
        password: '不少于6个字符',
        confirmPassword: '密码必须匹配',
      },
    },
    logout: '退出',
    channels: {
      header: '信道',
      dropdown: {
        rename: '改名',
        remove: '删除',
      },
    },
    messages: {
      counter: {
        count_other: '{{count}}消息',
      },
      label: '输入消息...',
      send: '发送',
    },
    modals: {
      headers: {
        add: '增加信道',
        rename: '改名信道',
        remove: '删除信道',
      },
      buttons: {
        cancel: '取消',
        submit: '发送',
        delete: '删除',
      },
      concern: '你确定吗?',
      rules: {
        required: '必须的',
        name: '3到20个字符',
        uniq: '必须是唯一的',
      },
    },
    toast: {
      network: '连接错误',
      add: '信道创建了',
      rename: '信道改名了',
      remove: '信道删除',
    },
    notFound: {
      header: '找不到页面',
      message: '返回',
      link: '首页',
    },
  },
};

export default zh;