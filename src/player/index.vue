/* 播放器的整体结果 */
<template>
  <div class="player-wrap">
    <mini-player></mini-player>
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
