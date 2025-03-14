import userApi from '@/api/module/userApi'
import projectApi from '@/api/module/projectApi'
import testApi from '@/api/module/caseApi'


export default {
	//用户模块接口
	user: userApi,
	//项目模块接口
	project: projectApi,
	//测试用例接口
	testcase:testApi,
}