const router = require('koa-router')();
const controller = require('../controller/wxlogin')

router.post('/api/wechat/login', controller.wxLogin)
router.get('/api/wechat/token', controller.wxToken)
router.get('/api/wechat/wxcode', controller.wxCode)
router.get('/api/wechat/userinfo', controller.wxUserInfo)

module.exports = router