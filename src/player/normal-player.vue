/* 全屏的大播放器 */
<template>
  <div class="normal-player-container">
    <!-- 背景图 -->
    <div class="background">
      <img class="bg-img" :src="currentSong.al.picUrl" alt="" />
    </div>
    <!-- 蒙层 -->
    <div class="background layer"></div>

    <!-- 顶部 -->
    <div class="top">
      <div class="back" @click="leaveFullScreenAction">
        <i class="iconfont icon-jiantou"></i>
      </div>
      <h1 class="title">{{ currentSong.name }}</h1>
      <h2 class="subtitle">{{ currentSong.ar }}</h2>
    </div>

    <!-- 中间唱片 -->
    <div class="middle">
      <div class="CD-wrapper">
        <img
          class="image"
          :class="{ pause: !playing }"
          :src="currentSong.al.picUrl"
          alt=""
        />
      </div>
    </div>

    <!-- 底部操作按键 -->
    <div class="bottom">
      <!-- 条形进度条 -->
      <bar-progress
        :model-value="progress"
        @update:modelValue="changeProgressAction"
        :current-time="currentTime"
        :duration="duration"
        @touchstart="handelTouchAction('start')"
        @touchend="handelTouchAction('end')"
      />

      <div class="operators">
        <!-- 播放模式 -->
        <div class="icon i-left" @click="changePlayModeAction">
          <i class="iconfont" :class="playModeIcon"></i>
        </div>
        <!-- 播放上一首 -->
        <div class="icon i-left" @click="prevAction">
          <i class="iconfont icon-shangyishoushangyige"></i>
        </div>
        <!-- 暂停和播放 -->
        <div class="icon i-center" @click="playChangeAction">
          <i
            class="iconfont"
            :class="{
              'icon-shipinbofangshibofang': !playing,
              'icon-weibiaoti519': playing,
            }"
          ></i>
        </div>
        <!-- 播放下一首 -->
        <div class="icon i-right" @click="nextAction">
          <i class="iconfont icon-xiayigexiayishou"></i>
        </div>
        <div class="icon i-right">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import BarProgress from "@/player/children/bar-progress.vue";

export default defineComponent({
  components: {
    BarProgress,
  },
  props: {
    progress: Number,
    currentTime: Number,
    duration: Number,
  },
  emits: ["change", "touchChange"],
  setup(props, { emit }) {
    const store = useStore();
    const playing = computed(() => store.state.player.playing); // 播放/暂停
    const mode = computed(() => store.state.player.mode); // 播放模式
    const currentSong = computed(() => store.getters["player/currentSong"]); // 当前歌曲

    /* 当前播放模式的图标 */
    const playModeIcon = computed(() => {
      switch (mode.value) {
        case 0:
          return "icon-suijibofang";
        case 1:
          return "icon-danquxunhuan";
        case 2:
          return "icon-suijibofang1";
      }
    });

    watch(mode, (newValue) => {
      // 其他模式变为随机播放, 找到当前歌曲所在歌单的下标
      if (newValue === 2) {
        // 根据当前歌曲的id,找到下标
      }
    });

    /* 退出全屏播放 */
    const leaveFullScreenAction = () => {
      store.commit("player/setFullScreen", false);
    };

    /* 修改进度条进度的事件 */
    const changeProgressAction = (progress) => {
      // 将进度传值给父组件
      emit("change", progress);
    };

    /* 将进度条触摸拖拽传递给外部 */
    const handelTouchAction = (flag) => {
      emit("touchChange", flag);
    };

    /* 播放暂停的点击事件 */
    const playChangeAction = () => {
      store.commit("player/setPlaying", !playing.value);
    };

    /* 切换播放模式 */
    const changePlayModeAction = () => {
      store.commit("player/changePlayMode");
    };

    /* 上一曲点击事件 */
    const prevAction = () => {
      // 播放模式为顺序播放: 播放上一首歌
      // 播放模式为单曲循环: 播放顺序列表的上一首歌
      // 播放模式为随机播放: 随机歌曲列表的上一首歌
    };

    /* 下一曲点击事件 */
    const nextAction = () => {
      // 播放模式为顺序播放: 播放下一首歌
      // 播放模式为单曲循环: 播放顺序列表的下一首歌
      // 播放模式为随机播放: 随机歌曲列表的下一首歌
    };
    return {
      playing,
      playModeIcon,
      currentSong,
      mode,

      changePlayModeAction,
      changeProgressAction,
      handelTouchAction,
      leaveFullScreenAction,
      playChangeAction,
      prevAction,
      nextAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.normal-player-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #eee;

  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);

    img.bg-img {
      width: 100%;
      height: 100%;
    }

    &.layer {
      background-color: #eee;
      opacity: 0.3;
      filter: none;
    }
  }

  .top {
    position: relative;
    margin-bottom: 25px;

    .back {
      position: absolute;
      top: 0;
      left: 6px;

      .iconfont {
        display: block;
        padding: 9px;
        font-size: 24px;
        font-weight: 700;
        color: #333;
        transform: rotate(90deg);
      }
    }

    .title {
      width: 70%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      color: #333;
    }

    .subtitle {
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }

  .middle {
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    width: 80%;
    height: 80vw;
    margin: auto;
    box-sizing: border-box;

    .CD-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 50%;

      .image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 10px solid #333;
        border-radius: 50%;
        animation: imgRotate 20s linear infinite;

        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }

  .bottom {
    position: absolute;
    left: 0;
    bottom: 50px;
    width: 100%;

    .operators {
      display: flex;
      align-items: center;

      .icon {
        flex: 1;
        text-align: center;
        color: #2e3030;
        font-weight: normal;

        .iconfont {
          font-size: 26px;
        }
      }
    }
  }
}
</style>
