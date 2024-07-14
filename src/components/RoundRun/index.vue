<script setup lang="ts">
import { onMounted, ref } from "vue";

const roundRef = ref<HTMLElement>();
const boxRef = ref<HTMLElement>();

onMounted(() => {
  /** 圆心 */
  const centerX = roundRef.value!.offsetWidth / 2;
  const centerY = roundRef.value!.offsetHeight / 2;

  console.log(centerX, centerY);

  let angle = 0;
  const fn = () => {
    angle++;
    const x =
      centerX + Math.cos((angle * Math.PI) / 360) * centerX - boxRef.value!.offsetHeight / 2;
    const y =
      centerY + Math.sin((angle * Math.PI) / 360) * centerX - boxRef.value!.offsetHeight / 2;
    boxRef.value!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(fn);
  };
  fn();
});
</script>

<template>
  <div class="round-run">
    <div class="round" ref="roundRef">
      <div class="box" ref="boxRef"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.round-run {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .round {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px solid white;
    border-radius: 50%;

    .box {
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: var(--blue);
    }
  }
}
</style>
