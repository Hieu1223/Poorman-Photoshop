<template>
  <div class="container">

    <div class="control">
      <button v-on:click="toggleSelect" >select</button>
      <button v-on:click="console.log(instance)">print</button>
    </div>

    <div class="layer-panel" v-if="instance != null">
      <LayerPanel v-bind:instance= instance></LayerPanel>
    </div>

    <canvas ref="canvas">
    </canvas>
    
  </div>
</template>

<style lang="css" scoped>
  canvas {
    padding: 0 !important;
    margin: 0 !important;
  }
  .container {
    flex-direction: row;
    display: flex;
  }
  .control {
    flex-direction: column;
    display: flex;
  }
  .layer{
    display: flex;
    flex-direction: row;
  }
</style>

<script lang="ts" setup>
  import type { ArisLayer } from './ArisDrawJS/components/Layer';
  import { ArisDraw } from './ArisDrawJS/main';
  import LayerPanel from './components/LayerPanel.vue'
  import { defineComponent, ref, type InputHTMLAttributes } from 'vue';

</script>

<script lang="ts">
  const instance = ref<ArisDraw>()
  let selectable: boolean = true
  const toggleSelect = ()=>{
    instance.value!.canvas.isDrawingMode = selectable
    selectable = !selectable
  }


  export default defineComponent({
    mounted(){
      instance.value = new ArisDraw(this.$refs.canvas as HTMLCanvasElement,{width : innerWidth * 0.9, height : innerHeight})
      instance.value.run()
    },
  })
</script>