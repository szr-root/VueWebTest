export const leftMenu = [
	{
		name:"项目管理",
		iconImg: new URL('@/assets/icon2/prom.png',import.meta.url).href,
		index:"1",
		children:[
			{
				name:"项目列表",
				path:"/project/proList",
				iconImg: new URL('@/assets/icon2/prolist.png',import.meta.url).href
			}
		]
	},
	{
		name:"项目详情",
		iconImg: new URL('@/assets/icon2/yuansu-jieduan.png',import.meta.url).href,
		index:"2",
		children:[
			{
				name:"功能模块",
				path:"/project/module",
				iconImg: new URL('@/assets/icon2/module4mokuai.png',import.meta.url).href
			},
			{
				name:"测试环境",
				path:"/env/list",
				iconImg: new URL('@/assets/icon2/huanjingguanli.png',import.meta.url).href
			},
		]
	},
	{
		name:"测试管理",
		iconImg: new URL('@/assets/icon2/ceshitaojian.png',import.meta.url).href,
		index:"3",
		children:[
			{
				name:"测试用例",
				path:"/cases/list",
				iconImg: new URL('@/assets/icon2/biz-test-o.png',import.meta.url).href
			},
			{
				name:"测试套件",
				path:"/suite/list",
				iconImg: new URL('@/assets/icon2/test-case-group.png',import.meta.url).href
			},
		]
	},
	{
		name:"测试计划",
		iconImg: new URL('@/assets/icon2/ceshijihua.png',import.meta.url).href,
		index:"4",
		children:[
			{
				name:"任务列表",
				path:"/plan/task",
				iconImg: new URL('@/assets/icon2/yuansu-jieduan.png',import.meta.url).href
			},
			{
				name:"定时任务",
				path:"/plan/corn",
				iconImg: new URL('@/assets/icon2/dingshirenwu.png',import.meta.url).href
			},
		]
	},
	{
		name:"测试报表",
		iconImg: new URL('@/assets/icon2/report.png',import.meta.url).href,
		index:"5",
		children:[
			{
				name:"执行记录",
				path:"/record/list",
				iconImg: new URL('@/assets/icon2/zhihangjilu.png',import.meta.url).href
			}
		]
	},
	{
		name:"分部式设备",
		iconImg: new URL('@/assets/icon2/bijiben.png',import.meta.url).href,
		index:"6",
		children:[
			{
				name:"设备管理",
				path:"/devices/list",
				iconImg: new URL('@/assets/icon2/shebei.png',import.meta.url).href
			}
		]
	},
	
]