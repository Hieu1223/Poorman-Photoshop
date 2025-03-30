<template>
      <div class="layer-panel" v-if="instance != null">
        <div style="display: flex;">
            <div>Opacity</div>
            <input type="range" min="0" max="100" :value="instance.layers[instance.active_layer].opacity * 100" v-on:input="(e)=>instance.setOpacity(Number((e.target as HTMLInputElement).value)/100)">
        </div>
        <div v-for="(layer, index) in instance.layers">
            <div class="layer">
                <div>
                    <input type="text" v-model="layer.name">
                </div>
                <button v-on:click="instance.showLayer(index,!layer.visible)">
                    <div>
                        <div v-if="layer.visible">hide</div>
                        <div v-else>show</div>
                    </div>
                </button>
                <div v-if="index == instance.active_layer">
                    activated
                </div>
                <div v-else>
                    <button v-on:click="instance.setActiveLayer(index)">activate</button>
                </div>
                <div>
                    <button v-if="index> 0" v-on:click="instance.deleteLayer(index)">delete</button>
                    <div v-else>delete</div>
                </div>
            </div>
        </div>
        <button v-on:click="add_layer">
            add layer
        </button>
      </div>
</template>

<style>
    .layer{
        display: flex;
        flex-direction: row;
    }
</style>


<script setup lang="ts">
    import { ArisLayer } from '@/ArisDrawJS/components/Layer';
    import { ArisDraw } from '@/ArisDrawJS/main';
    import { defineComponent, defineProps, reactive, ref } from 'vue';
    const props = defineProps({
        instance:{
            type:ArisDraw,
            required: true
        }
    })

    let add_layer = ()=>{
        let layer_index = props.instance.layers.length
        props.instance.layers.push(new ArisLayer(layer_index,'Layer ' + layer_index))
    }
</script>