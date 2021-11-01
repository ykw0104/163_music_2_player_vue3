/* 播放器的整体结果 */
<template>
  <div class="player-wrap">
    <!-- 底部小播放器 -->
    <!-- <mini-player></mini-player> -->

    <!-- 全屏大播放器 -->
    <normal-player></normal-player>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MiniPlayer from "./mini-player.vue";
import NormalPlayer from "./normal-player.vue";

export default defineComponent({
  components: {
    MiniPlayer,
    NormalPlayer,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
