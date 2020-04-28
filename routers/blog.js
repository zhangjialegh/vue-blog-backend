const router = require('koa-router')();
const controller = require('../controller/blog')


router.post('/api/blogs/insert', controller.insertBlog)
router.get('/api/blogs/list', controller.listBlog)
router.get('/api/blogs/detail', controller.findOneBlog)

module.exports = router