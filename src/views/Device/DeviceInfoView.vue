<template>
  设备详情页
  <div class="main">
    <!--顶部显示设备信息-->
    <div class="top_box">
      <div class="info_box">
        <div class="name">
          <!--图标-->
          <el-icon size="30">
            <Stopwatch/>
          </el-icon>
          <!--文字-->
          <div>设备编号</div>
        </div>
        <div class="info">{{ route.query.id }}</div>
      </div>

      <div class="info_box">
        <div class="name">
          <!--图标-->
          <el-icon size="30">
            <Location/>
          </el-icon>
          <!--文字-->
          <div>设备IP</div>
        </div>
        <div class="info">{{ route.query.ip }}</div>
      </div>

      <div class="info_box">
        <div class="name">
          <!--图标-->
          <el-icon size="30">
            <Menu/>
          </el-icon>
          <!--文字-->
          <div>操作系统</div>
        </div>
        <div class="info">{{ route.query.system }}</div>
      </div>

      <div class="info_box">
        <div class="name">
          <!--图标-->
          <el-icon size="30">
            <Platform/>
          </el-icon>
          <!--文字-->
          <div>设备名称</div>
        </div>
        <div class="info">{{ route.query.name }}</div>
      </div>

    </div>

    <!--具体内容信息-->
    <div class="content">
      <!--左侧显示屏幕-->
      <div class="left">
        <div class="title">屏幕监控(有界面的设备显示，无界面设备暂不支持设备屏幕同步)</div>
        <div class="device_box" v-loading="loading">
          <img :src="screenData" alt="设备画面" v-if="screenData">
          <img src="@/assets/images/login_bg.png" alt="loading" v-else>

        </div>
      </div>
      <!--右侧显示日志-->
      <div class="right">
        <div class="title">实时日志</div>
        <div class="log_box">

        </div>

      </div>

    </div>


  </div>


</template>

<script setup>
import {useRoute} from 'vue-router'
import {ref, onMounted} from 'vue'

const loading = ref(true)

const route = useRoute()

let screenData = ref('')


// 发送websoket请求和后端建立实时通信，订阅屏幕数据和日志数据，显示到页面
function initWebsocket() {
  const ws = new WebSocket(`ws://127.0.0.1:8000/api/node/ws/4444`)
  ws.onmessage = handleMessage
  ws.onclose = () => {
    console.log('websocket连接成功')
    loading.value = false
  }

}

function handleMessage(event) {
  const data = JSON.parse(event.data)
  console.log(data)
  screenData.value = 'data:image/webp;base64,' + data.data
}

onMounted(() => {
  initWebsocket()
})


</script>

<style scoped lang="scss">

.main {
  margin: 20px;

  .top_box {
    border-radius: 10px;
    border: dashed 1px var(--el-color-primary);
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .info_box {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .name {
        text-align: center;
      }

      .info {
        margin-left: 10px;
        color: black;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  .title {
    margin-top: 10px;
    font: bold 16px/40px '微软雅黑';
    height: 40px;
    color: #2a2a2a;
    text-align: center;
  }

  .content {
    display: flex;
    //左侧屏幕画面
    .left {
      width: 70%;

      .device_box {
        margin-right: 15px;
        background-color: #1f1f1f;
        border-radius: 10px;
        border: 5px solid black;
        height: calc(100vh - 200px);

        img {
          max-width: 100%;
          height: auto;
        }

      }
    }

    //右侧日志
    .right {
      width: 30%;
      height: 100%;


      .log_box {
        height: calc(100vh - 200px);
        border: 5px solid black;
        background-color: #424242;
        border-radius: 10px;
      }
    }

  }

}

</style>