<script setup lang="ts">
import { onMounted, ref } from "vue";

const eyesRef = ref<HTMLElement[]>();

const mouseMoveHandler = (e: MouseEvent) => {
  eyesRef.value!.forEach((eye, index) => {
    const pupil = eye.querySelector(".pupil") as HTMLElement;
    const line = eye.querySelector(".line") as HTMLElement;

    //获取眼球半径
    const radius = eye.offsetWidth / 2;
    //鼠标移动指定距离达到虹膜最大可移动距离
    const maxDistance = window.innerWidth / 2;

    //计算邻边
    const x = e.clientX - eye.offsetLeft - radius;
    //计算对边
    const y = e.clientY - eye.offsetTop - radius;
    //计算角度
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    //计算相对屏幕的斜边
    const distance = Math.sqrt(x * x + y * y);
    //限制虹膜移动范围
    const limit = Math.min(pupil.offsetWidth / (radius * 1.15), distance / maxDistance);
    //计算虹膜x位置
    const pupilX = radius * Math.cos((angle * Math.PI) / 180) * limit;
    //计算虹膜y位置
    const pupilY = radius * Math.sin((angle * Math.PI) / 180) * limit;

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px) rotate(${angle}deg)`;
    line.style.width = distance - Math.sqrt(Math.pow(pupilX, 2) + Math.pow(pupilY, 2)) + "px";
  });
};

onMounted(() => {
  window.addEventListener("mousemove", mouseMoveHandler);
});
</script>

<template>
  <div class="eyes">
    <div class="eye" ref="eyesRef" v-for="(item, index) in 2" :key="index">
      <div class="pupil">
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.eyes {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 100px;

  .eye {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    margin-right: 100px;

    /* border-radius: 50%; */
    background-color: white;

    .pupil {
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: black;

      /* border-radius: 50%; */

      .line {
        position: absolute;
        top: 50%;

        /* display: none; */
        left: 50%;
        z-index: 999;
        height: 3px;
        background-color: red;
        transform-origin: left center;
      }
    }
  }
}
</style>
