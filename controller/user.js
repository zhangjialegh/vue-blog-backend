const userModel = require('../lib/user.js');
const $utils = require('../utils/utils')

exports.createUser = async ctx => {
  const data = ctx.request.body
  console.log(data,'createUser')
}

exports.updateUser = async ctx => {
  const data = ctx.request.body
  console.log(data,'updateUser')
}

exports.getUserInfo = async ctx => {
    const {authorization} = ctx.request.header
    const token = authorization ? authorization : null
    if (!token) {
      ctx.body = {
        success: false,
        code: 401,
        msg: 'not found user'
      }
      return
    }
    const {openId} = $utils.decodeToken(token).payload.data
    try {
      const res = await userModel.findUserData(openId)
      if(res[0]) {
        const User = res[0]
        try {
          ctx.body = {
            code: 200,
            success: true,
            data: User
          }
        } catch (error) {
          console.log(err)
        }
      } else {
        ctx.body = {
          code: 403,
          msg: 'not found user'
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

exports.userUpdate = async ctx => {
    const data = ctx.request.body
    const {authorization} = ctx.request.header
    const token = authorization ? authorization : null
    const {openId} = $utils.decodeToken(token).payload.data
    try {
      const res = await userModel.findUserData(openId)
      if(res[0]) {
        const User = res[0]
        try {
          await userModel.updateUserData(User, data)
          ctx.body = {
            code: 200,
            msg: 'update userinfo success'
          }
        } catch (error) {
          console.log(err)
        }
      } else {
        ctx.response.status = 201
        ctx.body = {
          code: 201,
          msg: 'not found user'
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

