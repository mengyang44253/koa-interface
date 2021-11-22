const app=require('./app')

require('./config/database')
const config=require('./config/envConstant')



app.listen(config.APP_PORT,()=>{
	console.log(`服务器在${config.APP_PORT}启动成功`)
})
