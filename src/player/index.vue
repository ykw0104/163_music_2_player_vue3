/* 播放器的整体结果 */
<template>
  <div class="player-wrap">
    <!-- 底部小播放器 -->
    <mini-player />

    <!-- 全屏大播放器 -->
    <!-- <normal-player />-->
    <audio
      ref="audioRef"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, nextTick } from "vue";
import { mapState, mapGetters, useStore } from "vuex";

import MiniPlayer from "./mini-player.vue";
import NormalPlayer from "./normal-player.vue";

export default defineComponent({
  components: {
    MiniPlayer,
    NormalPlayer,
  },
  setup(props) {
    const store = useStore();

    console.log(store.state.player.playing);
    console.log(store.getters["player/currentSong"]);

    const id = computed(() => store.getters["player/currentSong"].id);

    const audioRef = ref(null);
    /* ----------------------------------------------------------------------------------------------------- */
    onMounted(() => {});
    /* ----------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------- */
    return {
      id,
      audioRef,
    };
  },
});
</script>

<style lang="scss" scoped></style>
