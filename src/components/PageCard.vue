<template>
	<el-main>
		<el-card style="border-radius: 10px;" body-style="padding:3px 10px">
			<!-- 显示顶部内容插槽 -->
			<div class="title">
				<slot name="title"></slot>
			</div>
			<!-- 主体内容 -->
			<div class="main_box">
				<slot name="main"></slot>
			</div>
			<!-- 底部 -->
			<div class="bottom_box">
				<slot name="bottom"></slot>
			</div>
		</el-card>
	</el-main>
</template>

<script setup>
</script>

<style scoped lang="scss">
	.el-main{
		padding: 5px 2px;
		.title{
			height: 40px;
			display: flex;
			align-items: center;
			color: var(--el-color-info);
			font: bold 14px/40px '微软雅黑';
		}
		.main_box{
			padding: 20px;
			height: calc(100vh - 273px);
			border-radius: 10px;
			box-shadow: inset 0 0 10px  var(--el-color-info);
			overflow-y: auto;
		}
		.bottom_box{
			// background-color: aqua;
			height: 50px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}
</style>