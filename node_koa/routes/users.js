const router = require('koa-router')()
const userModel = require('../models/user')
const util = require('util')
const jwt = require('jsonwebtoken')
// 解密
const verify = util.promisify(jwt.verify)
// 加盐 key
const secret = 'lqwiuerpowjflaskdjffkhgoiwurpoqdjlsakjflsdkf'

router.prefix('/users')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json'
  }
})
// 添加记录
router.get('/add', async (ctx, next) => {
  let user = await userModel.insert({
    name: 'jackdizhu',
    password: 'password',
    email: '',
    phone: '',
    ext: {
      nick_name: 'nick_name',
      head_img: 'head_img'
    }
  })
  ctx.body = {
    title: 'koa2 json',
    user: user
  }
})
// 查找记录
router.get('/find', async (ctx, next) => {
  let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json',
    users: users
  }
})
// 修改记录
router.get('/edit', async (ctx, next) => {
  let _user = await userModel.findOne({name: 'jackdizhu'})
  _user._id = _user._id.toString()
  _user.password = 'password1'
  let R = await userModel.update(_user)
  let user = await userModel.findOne({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json',
    user: user
  }
})
// 登录
router.get('/login', async (ctx, next) => {
  let user = await userModel.findOne({name: 'jackdizhu', password: 'password'})
  let token = ''
  if (user) {
    // 登录成功
    let userToken = {
        name: user.name
    }
    token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
  }
  ctx.body = {
    title: 'koa2 json',
    user: user,
    token: token
  }
})
// token
router.get('/token', async (ctx, next) => {
  const token = 'Bearer ' + (ctx.header.authorization || ctx.query.token || ctx.request.body.token || ctx.cookies.get('token') || '')
  let payload
  if (token) {
    try {
      // 解密，获取payload
      payload = await verify(token.split(' ')[1], secret)
    } catch (error) {
      payload = 'err'
    }
    ctx.body = {
      obj: {
        token: payload,
        _token: token
      }
    }
  } else {
    ctx.body = {
      obj: {
        message: 'token 错误',
        code: -1,
        _token: token
      }
    }
  }
})

module.exports = router
