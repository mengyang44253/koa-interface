
const Router=require('koa-router')

const friendRouter=new Router()

const {
	create,
	list,
	edit,
	editStatus,
	deleted
}=require('../controller/friend')

//后台添加友链
friendRouter.post('/admin/friend/create',create)

//后台友链列表
friendRouter.post('/admin/friend/list', list)

//后台修改友链
friendRouter.post('/admin/friend/edit', edit)

//修改友链状态
friendRouter.post('/admin/friend/editStatus',editStatus)

//后台删除友链
friendRouter.get('/admin/friend/deleted',deleted)




module.exports = friendRouter