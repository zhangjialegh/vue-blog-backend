const router = require('koa-router')();
const controller = require('../controller/user')

router.post('api/user/create', controller.createUser)
router.post('api/user/update', controller.updateUser)
router.get('/api/user/info', controller.getUserInfo)

module.exports = router