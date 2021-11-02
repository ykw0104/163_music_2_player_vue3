/* 播放器的整体结果 */
<template>
  <div class="player-wrap">
    <!-- 底部小播放器 -->
    <mini-player :progress="progress" />

    <!-- 全屏大播放器 -->
    <!-- <normal-player />-->

    <!-- 播放器 -->
    <audio
      ref="audioRef"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  nextTick,
  watch,
} from "vue";
import { useStore } from "vuex";

import MiniPlayer from "./mini-player.vue";
import NormalPlayer from "./normal-player.vue";

export default defineComponent({
  components: {
    MiniPlayer,
    NormalPlayer,
  },
  setup(props) {
    const store = useStore();
    const playing = computed(() => store.state.player.playing); // 播放或暂停状态
    const id = computed(() => store.getters["player/currentSong"].id); // 当前歌曲id

    const audioRef = ref(null);

    const currentTime = ref(0); // audio当前时间
    const duration = ref(0); // audio总时长
    // 进度百分比
    const progress = computed(() => {
      const result = currentTime.value / duration.value;
      return isNaN(result) ? 0 : result;
    });
    /* ----------------------------------------------------------------------------------------------------- */
    onMounted(() => {
      audioRef.value.addEventListener("canplay", () => {
        duration.value = audioRef.value.duration; // 在播放时, 获得音乐时长
      });

      audioRef.value.addEventListener("timeupdate", () => {
        currentTime.value = audioRef.value.currentTime; //当前播放时长
      });
    });
    /* ----------------------------------------------------------------------------------------------------- */
    /* 监听播放状态的改变, 操作audio标签播放或暂停歌曲 */
    watch(playing, (newValue) => {
      // dom渲染好之后, 在操作
      nextTick(() => {
        if (newValue) {
          audioRef.value.play(); // 播放
        } else {
          audioRef.value.pause(); //  暂停
        }
      });
    });

    /* 监听播放歌曲的改变 , 点击歌单中的某首歌*/
    watch(id, (newValue, oldValue) => {
      // 没有上一首歌, 返回
      if (!oldValue) {
        return;
      }
      // 有上一首歌,才重载歌曲
      nextTick(() => {
        audioRef.value.load();
        audioRef.value.play();
      });
    });
    /* ----------------------------------------------------------------------------------------------------- */
    return {
      id,
      audioRef,
      progress,
    };
  },
});
</script>

<style lang="scss" scoped></style>
