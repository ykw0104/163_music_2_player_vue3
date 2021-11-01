/* 底部的小播放器 */
<template>
  <div class="mini-play-container">
    <!-- 专辑图片 -->
    <div class="icon">
      <div class="img-wrapper">
        <img :class="{ pause: !play }" :src="currentSong.al.picUrl" alt="" />
      </div>
    </div>

    <!-- 歌曲信息  -->
    <div class="text">
      <h2 class="name">{{ currentSong.name }}</h2>
      <p class="desc">{{ currentSong.ar }}</p>
    </div>

    <!-- 播放/暂停 -->
    <div class="control">
      <!-- 环形进度条 双向绑定play的值 -->
      <circle-progress v-model="play" :progress="progress"></circle-progress>
    </div>

    <!-- 歌曲列表 -->
    <div class="control">
      <i class="iconfont icon-24gf-playlistMusic"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import CircleProgress from "./children/circle-progress.vue";

export default defineComponent({
  components: { CircleProgress },
  setup() {
    // 是否播放(播放/暂停)
    const play = ref(true);
    // 歌曲播放进度
    const progress = ref(0.2);

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
      progress,
    };
  },
});
</script>

<style lang="scss" scoped>
.mini-play-container {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #fff;

  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;

    .img-wrapper {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: imgRotate 10s linear infinite;

        /* 旋转暂停 */
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }

  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    overflow: hidden;

    .name {
      margin-bottom: 2px;
      font-size: 14px;
      color: #333;
    }

    .desc {
      font-size: 12px;
      color: #999;
    }
  }

  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    color: #de4439;

    .iconfont.icon-triangle-play {
      font-size: 16px;
    }

    .iconfont.icon-24gf-playlistMusic {
      font-size: 30px;
    }
  }
}
</style>
