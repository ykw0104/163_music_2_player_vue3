/* 环形进度条 */
<template>
  <!-- 播放/暂停 -->
  <div class="circle-progress">
    <!-- 环形进度条 -->
    <canvas ref="canvasRef" class="canvas"></canvas>

    <!-- 播放/暂停 -->
    <i
      class="iconfont"
      :class="{
        'icon-shipinbofangshibofang': !modelValue,
        'icon-weibiaoti519': modelValue,
      }"
      @click="changeAction"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: Boolean, // 是否在播放
    progress: Number, // 歌曲进度
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const canvasRef = ref(null);
    const context = ref(null); // 获取画布上下文

    onMounted(() => {
      // 设置画布
      canvasRef.value.width = 60;
      canvasRef.value.height = 60;
      // 获取画布上下文
      context.value = canvasRef.value.getContext("2d");

      renderAction(); // 挂载时渲染环形进度条
    });

    /* 监听进度条 */
    watch(
      () => props.progress,
      (newValue) => {
        renderAction(); // progress更新时渲染环形进度条
      }
    );

    const changeAction = () => {
      emit("update:modelValue", !props.modelValue);
    };

    /* 绘制播放器的环形进度条*/
    const renderAction = () => {
      // 清除上一次的绘制
      context.value.clearRect(0, 0, 60, 60);

      // 1. 绘制整个圆环
      context.value.save();
      context.value.beginPath();

      // 绘制大圆
      context.value.moveTo(30, 30);
      // 角度转弧度 : π/180*角度
      context.value.arc(30, 30, 30, 0, 2 * Math.PI * 2, false);
      context.value.lineTo(30, 30);

      // 绘制小圆
      context.value.moveTo(30, 30);
      context.value.arc(30, 30, 24, 0, 2 * Math.PI * 2, false);
      context.value.lineTo(30, 30);

      context.value.closePath();
      context.value.fillStyle = "rgba(212,68,57,0.3)";
      context.value.fill("evenodd");
      context.value.restore();

      // 2. 绘制圆弧
      context.value.save();
      context.value.beginPath();

      // 绘制大弧
      context.value.moveTo(30, 30);
      // 角度转弧度 : π/180*角度
      // 位置设置在12点钟方向, 默认是3点钟方向
      const startAng = (Math.PI / 180) * -90;
      const endAng = startAng + (Math.PI / 180) * 360 * props.progress;
      context.value.arc(30, 30, 30, startAng, endAng, false);
      context.value.lineTo(30, 30);

      // 绘制小弧
      context.value.moveTo(30, 30);
      context.value.arc(30, 30, 24, startAng, endAng, false);
      context.value.lineTo(30, 30);

      context.value.closePath();
      context.value.fillStyle = "rgba(212,68,57,1)";
      context.value.fill("evenodd");
      context.value.restore();
    };

    return {
      canvasRef,

      changeAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.circle-progress {
  position: relative;
  width: 30px;
  height: 30px;

  .iconfont {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
