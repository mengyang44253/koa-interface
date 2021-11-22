const Router = require('koa-router')


const systemRouter = new Router()


const {
  roleList,
  addRole,
  editRole,
  deleteRole,
  getAuth,
  editAuth,
  userList,
  userRole,
  deleteUser
} =require('../controller/system') 

//角色列表
systemRouter.post("/admin/sys/role/list",roleList)

//添加角色
systemRouter.post("/admin/sys/role/addRole", addRole)

//编辑角色
systemRouter.post("/admin/sys/role/editRole", editRole)

//删除某一个角色
systemRouter.get("/admin/sys/role/deleteRole", deleteRole)

//根据角色id获取对应的权限
systemRouter.get("/admin/sys/role/getAuth",getAuth)

//修改权限
systemRouter.post("/admin/sys/role/editAuth", editAuth)

//用户列表
systemRouter.post("/admin/sys/user/list", userList)

//修改用户的角色
systemRouter.post("/admin/sys/user/userRole", userRole)

//删除一个用户
systemRouter.get("/admin/sys/user/deleteUser",deleteUser)




module.exports=systemRouter