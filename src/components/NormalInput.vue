<script setup>
    defineProps({
        Id: {
            type: String,
            required: true
        },
        Placeholder: {
            type: String,
            required: true
        },
        Type: {
            type: String,
            required: true
        },
        modelValue: {
            type: String,
            required: true
        }
    })


    defineEmits(['update:modelValue'])
</script>

<template>
    <label  for="Id">
    <input 
        :model="modelValue"
        :type="Type" 
        :placeholder="Placeholder" 
        :id="Id"
        :value="modelValue"
        autoComplete="off" 
        @input="(e) => $emit('update:modelValue', e.target.value)"
    />
    </label>
</template>