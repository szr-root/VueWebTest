<template>
  <el-container>
    <!--      左侧浏览器操作-->
    <el-aside width="250px">
      <BrowserStep></BrowserStep>
    </el-aside>
    <PageCard>
      <template #title>
        <div>创建测试用例</div>
      </template>

      <template #main>
        <div>
          <el-input v-model="caseInfo.name" placeholder="输入用例名称">
            <template #prepend>用例名称</template>
          </el-input>
        </div>
        <!--执行步骤展示-->
        <draggable v-model="caseInfo.steps"
                   chosen-class="dragging"
                   item-key="index"

        >
          <template #item="{ element }">
            <div class="step">
              <div class="left_box">
                <div class="line1">
                  <el-icon class="header-icon" size="16px" color="var(--el-color-info)">
                    <Operation/>
                  </el-icon>
                  <div class="name"> {{ element.keyword }}</div>
                </div>
                <div class="line2">
                  <p>{{ element.desc }}</p>
                </div>
              </div>

              <!--按钮-->
              <div class="right_box">
                <el-button size="small" type="primary" plain icon="Edit"></el-button>
                <el-button size="small" type="danger" plain icon="Delete"></el-button>
              </div>
            </div>
          </template>

        </draggable>
        <!--        <div class="step">-->
        <!--          <div class="line1">-->
        <!--            <el-icon class="header-icon" size="16px" color="var(&#45;&#45;el-color-info)">-->
        <!--              <Operation/>-->
        <!--            </el-icon>-->
        <!--            <div class="name"> 启动浏览器</div>-->
        <!--            &lt;!&ndash;按钮&ndash;&gt;-->
        <!--            <div class="btn">-->
        <!--              <el-button size="small" type="primary" plain icon="Edit"></el-button>-->
        <!--              <el-button size="small" type="danger" plain icon="Delete"></el-button>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="line2">-->
        <!--              <p>开始启动浏览器</p>-->
        <!--          </div>-->
        <!--        </div>-->
      </template>

      <template #bottom>
        <el-button type="primary" plain icon="CircleCheckFilled" @click="createCase">保 存</el-button>
        <el-button plain icon="CircleCloseFilled" @click="back">取 消</el-button>
      </template>

    </PageCard>

  </el-container>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue'
import BrowserStep from '@/components/BrowserStep.vue'
import {ref, reactive} from "vue";
import {ProjectStore} from "@/stores/ProjectStore.js";
import http from '@/api/index'
import {ElMessage} from 'element-plus'
import {useRouter, useRoute} from 'vue-router'
import draggable from 'vuedraggable';

const router = useRouter()
const route = useRoute()
const pstore = ProjectStore()
//====创建用例====
const caseInfo = reactive({
  name: '新的用例',
  project_id: pstore.currentPro.id,
  steps: [
    {
      desc: "启动一个浏览器，默认chrome",
      keyword: '启动浏览器',
      method: "open_browser",
      params: {
        "browser_type": "chromium"
      },
    },
    {
      desc: "访问百度首页",
      keyword: '访问网站URL',
      method: "open_url",
      params: {
        url: 'https://www.baidu.com',
        wait_until: 'load',
        timeout: 30000
      }
    },
    {
      desc: "等待2s",
        keyword: '设置默认等待时间',
        method: "set_default_timeout",
        params: {
            timeout: 20000,
        }
    },
  ]
})


async function createCase() {
  const response = await http.testcase.createCase(caseInfo)
  if (response.status === 201) {
    ElMessage({
      type: 'success',
      message: `用例创建成功`,
    })
    back()
  }

}

//回退上一个页面
function back() {
  router.back()
  pstore.delTags(route.path)
}

</script>

<style scoped lang="scss">
.step {
  height: 50px;
  border: 1px dashed var(--el-color-primary);
  border-radius: 10px;
  padding: 5px 20px 5px 20px;
  margin-top: 10px;
  cursor: move;
  display: flex;

  align-items: center;
  justify-content: space-between;

  .line1 {
    padding-top: 5px;
    display: flex;
    align-items: center;

    .name {
      font: bold 13px/20px "微软雅黑";
      margin-left: 10px;
    }
  }

  .line2 {
    height: 25px;
    color: var(--el-color-info);

    p {
      margin-top: 5px;
    }
  }

  .right_box {
    //flex: 1;
    display: flex;
    text-align: center;
    justify-content: right;
  }
}

  .dragging {
    border: 2px solid var(--el-color-primary);
    z-index: 1000; /* 提升拖拽元素的层级 */
  }

//.step {
//  height: 50px;
//  border: 1px dashed var(--el-color-primary);
//  border-radius: 10px;
//  padding: 5px 20px 0 20px;
//  margin-top: 10px;
//  cursor: move;
//  .line1{
//    display: flex;
//    align-items: center;
//    height: 20px;
//    .name{
//      font:bold 13px/20px "微软雅黑";
//      margin-left: 10px;
//    }
//    .btn{
//      flex: 1;
//      text-align: right;
//    }
//  }
//  .line2{
//    height: 25px;
//    display: flex;
//    align-items: center;
//    color: var(--el-color-info);
//  }
//}

</style>