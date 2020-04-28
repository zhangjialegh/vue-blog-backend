exports.success = (ctx,data) => {
    let obj = {
        code: 200,
        success: true
    }
    if(data) obj['data'] = data
    ctx.body = obj
}

exports.otherScene = (ctx,{message}) => {
    ctx.body = {
        code: 200,
        success: false,
        message
    }
}

exports.needAuth = (ctx,{message}) => {
    ctx.body = {
        success: false,
        code: 401,
        message: message || '无效的用户'
    }
}

exports.invalidAuth = (ctx,{message}) => {
    ctx.body = {
        success: false,
        code: 403,
        message: message || '该用户不存在'
    }
}

exports.sysError = (ctx,{message}) => {
    ctx.body = {
        success: false,
        code: 500,
        message
    }
}