const { Blog } = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

// 注册用户
exports.insertBlog = ( res ) => {
  return Blog.create(res)
}

exports.findAllBlog = () => {
  return Blog.findAll()
}

exports.findOneBlog = ({ id }) => {
  return Blog.findOne({
    where: {
      id
    }
  })
}

exports.updateBlog = ({ id, userId, account, remark }) => {
  return Blog.update({
    account,
    remark
  }, {
    where: {
      id,
      [Op.and]: {
        userId
      }
    }
  })
}

exports.deleteBlog = ({ id, userId }) => {
  return Blog.update({
    showTime: false
  }, {
    where: {
      id,
      [Op.and]: {
        userId
      }
    }
  })
}

// exports.getTopic = async (lastCursor, pageSize) => {
//   const topicList = await Blog.findAll({
//     where: {
//       publish_time: {
//         $ne: null
//       }
//     },
//     order: [
//       ['order','DESC']
//     ]
//   })
//   const res = topicList.slice(lastCursor, Number(pageSize)+Number(lastCursor))
//   return res
// }