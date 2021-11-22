const Router=require('koa-router')


const userRouter=new Router()

const {
	register,
	login,
	checkName,
	getUserInfoById,
	checkPassword,
	repeatPassword,
	updatePassword,
	updateUserInfo
}=require('../controller/user')


//后台注册
userRouter.post('/admin/user/register',register)

//后台登陆
userRouter.post('/admin/user/login',login)

//用户名是否重复
userRouter.post('/admin/user/checkName',checkName)

//获取用户信息
userRouter.get('/admin/user/getUserInfoById',getUserInfoById)

//校验密码
userRouter.get('/admin/user/checkPassword',checkPassword)

//密码是否重复
userRouter.get('/admin/user/repeatPassword',repeatPassword)

//更新密码
userRouter.post('/admin/user/updatePassword',updatePassword)

//更新用户信息
userRouter.post('/admin/user/updateUserInfo',updateUserInfo)




module.exports = userRouter