<template>
  <div id="nav-app">
    <!-- 歌手的歌曲列表 -->
    <song-list-page :data="dataSource" :class="{ hasPadding: showPlayer }" />

    <!-- 播放器 -->
    <player v-if="showPlayer" />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

import Player from "@/player/index";
import SongListPage from "./SongListPage.vue";

import axios from "axios";

export default defineComponent({
  components: { SongListPage, Player },
  setup() {
    const store = useStore();
    const showPlayer = computed(() => store.state.player.currentIndex >= 0);

    const dataSource = ref([]);

    /* 请求歌手的歌曲列表 */
    axios.get("http://localhost:3000/artists?id=7424").then((res) => {
      // 请求歌手的歌曲列表的数据
      dataSource.value = res.data.hotSongs.map((item) => {
        return {
          id: item.id,
          name: item.name,
          // ar: item.ar,
          ar: item.ar.map((arItem) => arItem.name).join("/"), // 歌手列表
          al: {
            name: item.al.name,
            picUrl: item.al.picUrl,
          },
        };
      });
    });
    return { showPlayer, dataSource };
  },
});
</script>

<style lang="scss">
/* 专辑图片的旋转特效 */
@keyframes imgRotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

* {
  padding: 0;
  margin: 0;
}

html,
body,
#nav-app {
  width: 100%;
  height: 100%;
}

.hasPadding {
  padding-bottom: 60px;
}
</style>
