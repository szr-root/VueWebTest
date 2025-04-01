<template>
  <div class="box" v-if="run_info">
    <!--基本信息-->
    <el-descriptions
        :column="2"
        :title="run_info.name"
        :size="size"
        border
    >
      <el-descriptions-item label="执行状态">
        {{ run_info.state }}
      </el-descriptions-item>

      <el-descriptions-item label="是否跳过执行">
        {{ run_info.skip }}
      </el-descriptions-item>

      <el-descriptions-item label="执行记录ID">
        {{ run_info.id }}
      </el-descriptions-item>

      <el-descriptions-item label="执行步骤数量">
        {{ run_info.steps.length }}
      </el-descriptions-item>

    </el-descriptions>

    <!--步骤和日志-->
    <el-row>
      <el-col :span="12">
        <div class="title">用例执行步骤</div>
        <div class="step_box">
          <el-steps direction="vertical" :active="run_info.steps.length" space="60px">
            <el-step v-for="(step,index) in run_info.steps" :key="index">
              <template #icon>
                <el-icon size="20px">
                  <ChromeFilled/>
                </el-icon>
              </template>

              <template #title>
                <div class="step_title"> {{ step.keyword }}</div>

              </template>
              <template #description>
                <div class="step_desc">{{ step.desc }}</div>

              </template>
            </el-step>

          </el-steps>
        </div>

      </el-col>

      <el-col :span="12">
        <div class="title">执行日志</div>
        <div class="logs_box">
          <div v-for="(log,index) in run_info.log_data" :key="index">{{ log }}</div>
        </div>


      </el-col>

    </el-row>

    <!-- 截图 -->
    <div class="title">执行结果截图</div>
    <img v-if="run_info.img" :src="run_info.img" style="border: 3px solid black" alt="执行结果">
  </div>


  <div class="box" v-else>
    <div class="title">无执行记录详细信息</div>
  </div>

</template>

<script setup>

const props = defineProps({
  run_info: {
    type: Object,
    default: () => {
      return {}
    }
  }
})


</script>

<style scoped lang="scss">
.box {
  margin: 20px;


  .title {
    font-weight: bold;
    height: 40px;
    line-height: 40px;
  }

  .step_box {
    border-radius: 10px;
    margin-right: 10px;
    //background-color: #edeaef;
    padding: 20px;
    max-height: 400px;
    overflow-y: auto;
  }

  .step_title {
    font-size: 14px;
  }

  .step_desc {
    font-size: 12px;
    color: #424242;
  }

  .logs_box {
    border-radius: 10px;
    font-size: 12px;
    color: white;
    background-color: rgba(80, 77, 77, 0.91);
    padding: 20px;
    max-height: 400px;
    overflow-y: auto;
  }

}
</style>