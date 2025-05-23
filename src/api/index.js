import userApi from '@/api/module/userApi'
import projectApi from '@/api/module/projectApi'
import testApi from '@/api/module/caseApi'
import task from '@/api/module/taskAPi.js'
import record from '@/api/module/recordAPi.js'
import run from '@/api/module/runAPi.js'
import device from '@/api/module/deviceApi.js'


export default {
	//用户模块接口
	user: userApi,
	//项目模块接口
	project: projectApi,
	//测试用例接口
	testcase:testApi,
	//任务接口
	task:task,
	//记录相关接口
	record:record,
	//运行接口
	run:run,
	//设备接口
	device:device
}