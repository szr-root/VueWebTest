<template>
  <div class="browser_box">
    <div class="title">
      <el-icon size="20" color="var(--el-color-primary)">
        <ChromeFilled/>
      </el-icon>
      <b>操作选项</b>
    </div>

    <!--    操作选项-->
    <div class="main">
      <el-collapse v-model="activeName">
        <el-collapse-item :name="groupItem.groupId" :key="groupItem.groupId" v-for="(groupItem,index) in BrowserAction">
          <template #title>
            <el-link :icon="groupItem.groupIcon" :underline="false">{{ groupItem.name }}</el-link>
          </template>

          <draggable v-model="groupItem.items"
                     chosen-class="dragging"
                     item-key="index"
                     ghost-class="ghost"
                     :group="{name:'steps',pull:'clone',put:false}"
                     :sort="false"
                     :clone="cloneData"
          >
            <template #item="{ element }">
              <div class="card_info">
                <span>{{ element.keyword }}</span>
                <el-icon>
                  <CirclePlus/>
                </el-icon>
              </div>
            </template>
          </draggable>
        </el-collapse-item>

      </el-collapse>
    </div>
  </div>

</template>

<script setup>
import BrowserAction from '@/datas/BrowserAction.js'
import {ref, reactive} from 'vue'
import draggable from 'vuedraggable';

const activeName = ref(['1'])

//自定义拖拽数据的结构
function cloneData(data) {
  console.log(data)
  return {
    //todo 这里应该有bug，在实际使用中，拖拽时修改数据，但是时间却变成了string类型
    //给数据增加一个唯一的标识
    id: String(new Date().getTime()) + String(Math.random() * 1000).slice(0,2),
    desc: data.keyword,
    ...data
  }
}

</script>

<style scoped lang="scss">

.browser_box {
  height: calc(100vh - 140px);
  overflow-y: auto;
  box-shadow: 0 0 5px var(--el-color-info);
  border-radius: 10px;
  margin: 5px 5px;

  .title {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    b {
      font: bold 14px/40px '微软雅黑';
      color: var(--el-color-info);
      margin-left: 5px;
    }
  }

  .main {
    padding: 0 10px;
  }


}

.card_info {
  box-shadow: inset 0 0 2px var(--el-color-info);
  border-radius: 5px;
  height: 22px;
  margin: 8px 5px 0 8px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
  }
}

.card_info:hover {
  color: var(--el-color-primary);
  cursor: move;
}

//选择拖拽时的样式
.dragging {
  border: 2px solid var(--el-color-primary);
  z-index: 1000; /* 提升拖拽元素的层级 */
}

//拖拽中占位的样式
.ghost {
  border: 2px dashed var(--el-color-primary);
}
</style>