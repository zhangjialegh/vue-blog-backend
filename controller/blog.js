const blogsModel = require('../lib/blog.js');
const userModel = require('../lib/user')
const $utils = require('../utils/utils')
const resState = require('./response/template')
const cheerio = require('cheerio')

exports.insertBlog = async ctx => {
  try {
    const { author, label, content } = ctx.request.body
    const $ = cheerio.load(String(JSON.parse(content)))
    const summary = $('p').text().replace(/\s*/g,"").slice(0, 200)
    const cover = $('img').attr('src').replace(/\s*/g,"") || ''
    const title = $('h1').text().replace(/\s*/g,"") || $('h2').text().replace(/\s*/g,"")
    
    console.log(cover, 'html')
    await blogsModel.insertBlog({ author, label, content, summary, cover, title})
    resState.success(ctx)


    // const res = await userModel.findUserData(openId)
    // if(res[0]) {
    //   try {
    //     const { webname, account, remark } = ctx.request.body
    //     const userId = res[0]['id']
    //     await blogsModel.insertblog({ webname, account, remark, userId })
    //     resState.success(ctx)
    //   } catch (err) {
    //     resState.sysError(ctx,err)
    //   }
    // } else {
    //   resState.invalidAuth(ctx)
    // }
  } catch (error) {
    resState.sysError(ctx,error)
  }
}

exports.listBlog = async (ctx,next) => {
  try {
    const data = ctx.request.query
    const lib = {
      from: (data.page - 1) * data.limit,
      to: data.page * data.limit - 1
    }
    const blogs = await blogsModel.findAllBlog()
    const blogss = blogs.slice(lib.from, lib.to)
    let blogsList = []
    for (const key in blogss) {
      if (blogss.hasOwnProperty(key)) {
        const ele = blogss[key];
        blogsList.push({
          id: ele['id'],
          author: ele['author'],
          label: ele['label'],
          content: ele['content'],
          summary: ele['summary'],
          cover: ele['cover'],
          title: ele['title'],
          createdAt: ele['createdAt'],
          updatedAt: ele['updatedAt']
        })
      }
    }
    resState.success(ctx,blogsList)
  } catch (error) {
    resState.sysError(ctx,error)
  }
}

exports.findOneBlog = async (ctx,next) => {
  const { id } = ctx.request.query
  console.log(id, 'blog id')
  try {
    const blog = await blogsModel.findOneBlog({ id })
    if(!blog) {
      resState.otherScene(ctx,{
        message: '未找到该信息'
      })
    } else {
      console.log(blog, 'blog')
      resState.success(ctx,{
        author: blog.author, 
        label: blog.label, 
        content: blog.content, 
        summary: blog.summary, 
        cover: blog.cover, 
        title: blog.title
      })
    }
  } catch (error) {
    resState.sysError(ctx,error)
  }
}


exports.updateblog = async (ctx,next) => {
  const { authorization } = ctx.request.header
  const token = authorization ? authorization : null
  if(!token) {
    resState.needAuth(ctx)
    next()
  }
  const { openId } = $utils.decodeToken(token).payload.data
  const { id, account, remark } = ctx.request.body
  try {
    const res = await userModel.findUserData(openId)
    if(res[0]) {
      const blog = await blogsModel.updateblog({ 
        id, 
        userId: res[0]['id'],
        account,
        remark
      })
      if(!blog) {
        resState.otherScene(ctx,{
          message: '未找到该信息'
        })
      } else {
        resState.success(ctx)
      }
    } else {
      resState.invalidAuth(ctx)
    }
  } catch (error) {
    resState.sysError(ctx,error)
  } 
}

exports.deleteblog = async (ctx,next) => {
  const { authorization } = ctx.request.header
  const token = authorization ? authorization : null
  if(!token) {
    resState.needAuth(ctx)
    next()
  }
  const { openId } = $utils.decodeToken(token).payload.data
  const { id } = ctx.request.query
  try {
    const res = await userModel.findUserData(openId)
    if(res[0]) {
      await blogsModel.deleteblog({ 
        id, 
        userId: res[0]['id']
      })
      const blogs = await blogsModel.findAllblogs({ userId: res[0]['id'] })
      let blogsList = []
      for (const key in blogs) {
        if (blogs.hasOwnProperty(key)) {
          const ele = blogs[key];
          blogsList.push({
            logo: ele['webname'].slice(0,1),
            webname: ele['webname'],
            remark: ele['remark'],
            id: ele['id'],
            updatedAt: new Date(ele['updatedAt']).getTime()
          })
        }
      }
      resState.success(ctx,blogsList)
    } else {
      resState.invalidAuth(ctx)
    }
  } catch (error) {
    resState.sysError(ctx,error)
  } 
}
