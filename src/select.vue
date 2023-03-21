<template>
 <v-select
        :items="items"
        itemText="name"
        itemValue="id"
        :modelValue="modelValue"
        @update:modelValue="onChange"
      />
</template>
<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
    modelValue: {
        type: Number
    },
    items: {
        type: Array
    },
    
})
const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props);

const onChange = (value: number,) => {
    emit('update:modelValue', value)
}
</script>