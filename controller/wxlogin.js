const userModel = require('../lib/user.js');
const $utils = require('../utils/utils')

exports.wxLogin = async ctx => {
  try {
    const res = await $utils.code_to_session(ctx.request.body, ctx.request.body.code)
    const openId = res.data.openid
    const scene = ctx.request.body.scene
    let data = {}
    data['wechatOpenid'] = openId
    data['thirdSession'] = $utils.createToken({
      openId: openId
    }, 3)
    data['scene'] = scene
    let params = []
    Object.keys(data).map((item) => {
      params.push(data[item])
    })
    try {
      const resMiddle = await userModel.findUserData(openId)
      if (resMiddle[0]) {
        ctx.body = {
          success: true,
          code: 200,
          message: '用户登录成功',
          third_session: data['thirdSession'],
          id: resMiddle[0].id
        }
      } else {
        try {
          const res = await userModel.createUser(params)
          if (res) {
            ctx.body = {
              code: 200,
              success: true,
              third_session: data['thirdSession'],
              id: resMiddle.insertId
            }
          }
        } catch (err) {
          ctx.response.status = 500
          ctx.body = {
            success: false,
            code: 500,
            msg: err.message
          }
        }
      }
    } catch (err) {
      ctx.response.status = 500
      ctx.body = {
        success: false,
        code: 500,
        msg: err.message
      }
    }

  } catch (err) {
    ctx.response.status = 500
    ctx.body = {
      success: false,
      code: 500,
      msg: err.message
    }
  }
}

exports.wxToken = async ctx => {
  try {
    const tokenRes = await $utils.get_access_token()
    const ticketRes = await $utils.get_jsapi_ticket(tokenRes.data.access_token)
    const {
      url
    } = ctx.request.query
    const res = $utils.ticket_to_signature(ticketRes.data.ticket, url)
    ctx.body = {
      code: 200,
      success: true,
      data: res
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      code: 500,
      success: false,
      message: error.message
    }
  }
}

exports.wxCode = async ctx => {
  try {
    const {
      url,
      web
    } = ctx.request.query
    let res = null
    if (`${web}` === '1') {
      res = await $utils.web_get_qrcode('https://qq.jd.com/new/wx/callback.action?view=null')
    } else {
      res = await $utils.web_get_code(url)
    }
    ctx.body = {
      code: 200,
      success: true,
      data: res
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      code: 500,
      success: false,
      message: error.message
    }
  }
}

exports.wxUserInfo = async ctx => {
  try {
    const {
      code
    } = ctx.request.query
    const codRes = await $utils.web_code_to_token(code)
    const accessToken = codRes.data.access_token
    const openId = codRes.data.openid
    const res = await $utils.web_get_userinfo(accessToken, openId)
    let data = {}
    data['thirdSession'] = $utils.createToken({
      openId: openId
    }, 3)
    data['wechatNickname'] = res.data.nickname
    data['wechatProvince'] = res.data.province
    data['wechatCity'] = res.data.city
    data['wechatCountry'] = res.data.country
    data['wechatOpenid'] = openId
    data['wechatAvatarUri'] = res.data.headimgurl
    try {
      const resMiddle = await userModel.findUserData(openId)
      const dataDemo = JSON.parse(JSON.stringify(data))
      delete dataDemo['wechatOpenid']
      if (resMiddle[0]) {
        ctx.body = {
          success: true,
          code: 200,
          message: '用户登录成功',
          data: {
            ...dataDemo,
            id: resMiddle[0].id
          }
        }
      } else {
        try {
          const user = await userModel.createUser(data)
          if (user) {
            ctx.body = {
              code: 200,
              success: true,
              data: {
                ...dataDemo,
                id: resMiddle.insertId
              }
            }
          }
        } catch (err) {
          ctx.response.status = 500
          ctx.body = {
            code: 500,
            success: false,
            msg: err.message
          }
        }
      }
    } catch (err) {
      ctx.response.status = 500
      ctx.body = {
        code: 500,
        success: false,
        msg: err.message
      }
    }

  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      code: 500,
      success: false,
      message: error.message
    }
  }
}