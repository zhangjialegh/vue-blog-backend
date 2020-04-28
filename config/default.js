const config = {
  dev: {
    // 启动端口
    port: 3001,
    // 数据库配置
    database: {
      DATABASE: 'blog',
      USERNAME: 'root',
      PASSWORD: '123456',
      PORT: '3306',
      HOST: '127.0.0.1'
    },
    wechat: {
      jd_id: 'wx827225356b689e24',
      app_id:'wx4870da4113bed504',
      secret_id:'2a5ee5a59eaae4042d61d403c90fd0e8',
      wechat_grant_type:'client_credential',
      wechat_get_qrcode_url: 'https://open.weixin.qq.com/connect/qrconnect',
      wechat_get_code_url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      wechat_code_to_token_url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
      wechat_code_to_session_url:'https://api.weixin.qq.com/sns/jscode2session',
      wechat_access_token_url: 'https://api.weixin.qq.com/cgi-bin/token',
      wechat_jsapi_ticket_url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
      wechat_get_userinfo_url: 'https://api.weixin.qq.com/sns/userinfo'
    }
  },
  prod: {
    // 启动端口
    port: 3001,
    // 数据库配置
    database: {
      DATABASE: 'blog',
      USERNAME: 'root',
      PASSWORD: '123456',
      PORT: '3306',
      HOST: '127.0.0.1'
    },
    wechat: {
      jd_id: 'wx827225356b689e24',
      app_id:'wx4870da4113bed504',
      secret_id:'2a5ee5a59eaae4042d61d403c90fd0e8',
      wechat_grant_type:'client_credential',
      wechat_get_qrcode_url: 'https://open.weixin.qq.com/connect/qrconnect',
      wechat_get_code_url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      wechat_code_to_token_url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
      wechat_code_to_session_url:'https://api.weixin.qq.com/sns/jscode2session',
      wechat_access_token_url: 'https://api.weixin.qq.com/cgi-bin/token',
      wechat_jsapi_ticket_url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
      wechat_get_userinfo_url: 'https://api.weixin.qq.com/sns/userinfo'
    }
  }
}

module.exports = config