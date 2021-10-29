<template>
  <div class="song-list page">
    <ul>
      <li
        class="item"
        v-for="(item, index) in data"
        :key="item.id"
        @click="songClickAction(item)"
      >
        <p class="index">{{ index + 1 }}</p>
        <div class="content">
          <h3 class="name">{{ item.name }}</h3>
          <p class="info">
            <!-- 歌手列表 -->
            <span>{{ item.ar }}</span>
            <span> - </span>
            <!-- 专辑名字 -->
            <span>{{ item.al.name }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: Array,
  },
  setup() {
    const songClickAction = (item) => {
      console.log(JSON.stringify(item));
    };
    return {
      songClickAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;

  .index {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    height: 40px;

    .name {
      font-size: 16px;
      font-weight: normal;
    }

    .info {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
