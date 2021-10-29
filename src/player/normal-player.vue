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
      <div class="back">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <h1 class="title">{{ currentSong.name }}</h1>
      <h2 class="subtitle">{{ currentSong.ar }}</h2>
    </div>

    <!-- 中间唱片 -->
    <div class="middle">
      <div class="CD-wrapper">
        <img
          class="image"
          :class="{ pause: !play }"
          :src="currentSong.al.picUrl"
          alt=""
        />
      </div>
    </div>

    <!-- 底部操作按键 -->
    <div class="bottom">
      <div class="operators">
        <div class="icon i-left">
          <i class="iconfont icon-xunhuan"></i>
        </div>
        <div class="icon i-left">
          <i class="iconfont icon-shangyishoushangyige"></i>
        </div>
        <div class="icon i-center">
          <i class="iconfont icon-24gl-playCircle"></i>
        </div>
        <div class="icon i-right">
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const play = ref(true);

    // 当前歌曲信息
    const currentSong = ref({
      id: 1812673579,
      name: "等你归来",
      ar: "程响",
      al: {
        name: "等你归来",
        picUrl:
          "https://p1.music.126.net/bisOFZHy6WuBBfaHtr238Q==/109951165674729204.jpg",
      },
    });

    return {
      play,
      currentSong,
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
    top: 10%;
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
