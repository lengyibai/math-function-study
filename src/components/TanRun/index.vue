<script setup lang="ts">
import { _createEl } from "@/utils";
import { onMounted, ref } from "vue";

const size = 400;

const contentRef = ref<HTMLElement>();
const dotRef = ref<HTMLElement>();
const lineRef = ref<HTMLElement>();

let deg = ref(0);
const tan_value = ref(0);

onMounted(() => {
  const fn = () => {
    deg.value += 0.5;
    requestAnimationFrame(fn);
    contentRef.value!.style.left = `${deg.value * 2}px`;
    tan_value.value = Math.tan((deg.value * Math.PI) / 180);
    lineRef.value!.style.transform = `translateX(${size / 2}px) rotate(-${deg.value + 90}deg)`;
    dotRef.value!.style.transform = `translateX(-50%) translateY(${(-tan_value.value * size) / 2}px)`;

    _createEl(dotRef.value!);
  };
  fn();
});
</script>

<template>
  <div class="tan-animation">
    <div class="info">
      <span>Tan({{ deg.toFixed(0) }}°) = {{ tan_value.toFixed(2) }}</span>
    </div>
    <div class="content" ref="contentRef">
      <div class="line" ref="lineRef"></div>
      <div class="round"></div>
      <div class="dot" ref="dotRef">{{ tan_value.toFixed(2) }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tan-animation {
  --size: 400px;

  width: 100%;
  height: 100%;

  .info {
    position: absolute;
    left: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    font-size: 50px;
    text-align: center;
    transform: translateX(-50%);
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 1px;
    background-color: white;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 100vh;
    background-color: white;
    transform: translate(-50%, -50%);
  }

  .content {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 100vh;
      background-color: green;
      transform: translateX(var(--size));
    }

    .line {
      width: 1px;
      height: 100vw;
      background-color: blue;
    }

    .round {
      position: relative;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background-color: var(--white-25);

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(var(--size) / 20);
        height: calc(var(--size) / 20);
        border-radius: 50%;
        background-color: white;
        transform: translate(-50%, -50%);
      }
    }

    .dot {
      z-index: 1;
      width: calc(var(--size) / 10);
      height: calc(var(--size) / 10);
      padding-left: calc(var(--size) / 10);
      border-radius: 50%;
      color: white;
      font-size: 25px;
      line-height: calc(var(--size) / 10);
      background-color: red;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        right: calc(var(--size) / 20);
        width: var(--size);
        height: 1px;
        border-radius: 50%;
        background-color: red;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
