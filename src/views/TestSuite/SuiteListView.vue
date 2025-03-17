<template>
  <div class="drag-container">
    <!-- 单个列表，用于拖拽排序 -->
    <draggable
      v-model="items"
      chosen-class="dragging"
      item-key="id"
      class="item-list"
      >
      <template #item="{ element }">
        <div class="drag-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import draggable from 'vuedraggable';

  // 定义一个列表，用户可以在其中拖拽排序
  const items = ref([
    {id: 1, name: '项目 1'},
    {id: 2, name: '项目 2'},
    {id: 3, name: '项目 3'},
    {id: 4, name: '项目 4'},
    {id: 5, name: '项目 5'},
  ]);
</script>

<style scoped>
  .drag-container {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  }

  .drag-item {
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    cursor: move;
    text-align: center;
  }

  .item-list {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
  }

  .dragging {
    border: 2px dashed var(--el-color-primary);
    z-index: 1000; /* 提升拖拽元素的层级 */
  }

</style>