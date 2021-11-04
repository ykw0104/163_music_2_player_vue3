./* 条形进度条 */
<template>
  <div class="bar-progress">
    <!-- 当前时长 -->
    <span class="text">{{ formatTime(currentTime) }}</span>
    <!-- 条形进度条 -->
    <div ref="barRef" class="bar" :style="{ backgroundImage: backgroudStyle }">
      <span ref="iconRef" class="icon"></span>
    </div>
    <!-- 总时长 -->
    <span class="text">{{ formatTime(duration) }}</span>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  nextTick,
  computed,
} from "vue";

export default defineComponent({
  props: {
    modelValue: Number,
    currentTime: Number,
    duration: Number,
  },
  emits: ["update:modelValue", "touchstart", "touchend"],
  setup(props, { emit }) {
    const barRef = ref(null);
    const iconRef = ref(null);

    const maxScroll = ref(null);

    const formatTime = (time) => {
      // 计算分钟数
      let mins = Math.floor(time / 60);
      // 计算秒数
      let second = Math.floor(time % 60);
      second = second > 9 ? second : "0" + second;
      return mins + ":" + second;
    };

    onMounted(() => {
      // 调整dom, 添加移动端触发事件
      const bar = barRef.value;
      const icon = iconRef.value;
      maxScroll.value = bar.offsetWidth - icon.offsetWidth; // 最大偏移量

      // 添加icon的触摸事件
      icon.addEventListener("touchstart", (event) => {
        let x = maxScroll.value * props.modelValue; // 记录每一次偏移的位置
        // 告诉外部,触摸开始
        emit("touchstart");

        // 记录开始的位置
        const startX = event.changedTouches[0].clientX;
        const touchmoveCallBack = (event) => {
          // 计算偏移量
          let offsetX = event.changedTouches[0].clientX - startX;
          offsetX = offsetX + x; //叠加上一次的位置
          // 约束偏移量
          if (offsetX < 0) {
            offsetX = 0;
          }
          if (offsetX > maxScroll.value) {
            offsetX = maxScroll.value;
          }

          // 手指移动多少,让icon标签在当前的位置跟着偏移多少
          icon.style.transform = `translate(${offsetX}px,-50%)`;
          // 计算进度的百分比, progress = offsetX / maxScroll.value
          emit("update:modelValue", offsetX / maxScroll.value);
        };

        const touchendCallBack = (event) => {
          // 告诉外部,触摸停止了
          emit("touchend");
          // 移除监听
          document.removeEventListener("touchmove", touchmoveCallBack);
          document.removeEventListener("touchend", touchendCallBack);
        };

        // 添加监听
        document.addEventListener("touchmove", touchmoveCallBack);
        document.addEventListener("touchend", touchendCallBack);
      });
    });

    /* 根据modelValue的变化修改背景线性渐变效果 */
    /* 条形进度条左右两边的颜色 */
    const backgroudStyle = computed(() => {
      const percent = props.modelValue * 100;

      return `linear-gradient(to right, #d44439 0%, #d44439 ${percent}%, grey ${percent}%, grey 100%)`;
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        nextTick(() => {
          // 调整icon的初始位置
          iconRef.value.style.transform = `translate(${
            maxScroll.value * props.modelValue
          }px,-50%)`;
        });
      },
      { immediate: true }
    );

    return {
      barRef,
      iconRef,
      backgroudStyle,

      formatTime,
    };
  },
});
</script>

<style lang="scss" scoped>
.bar-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 5px auto;

  .bar {
    position: relative;
    flex: 1;
    height: 4px;
    background-color: #eee;

    .icon {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      display: block;
      width: 12px;
      height: 12px;
      border: 3px solid #fff;
      border-radius: 50%;
      background-color: #d44439;

      &::before {
        content: "";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
      }
    }
  }

  .text {
    width: 25px;
    margin: 0 5px;
    text-align: cente;
    color: #666;
    font-size: 12px;
  }
}
</style>
