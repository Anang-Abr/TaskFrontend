<script setup>
    import NormalInput from "@/components/NormalInput.vue"
    import { reactive } from "vue";
    import { useListStore } from "@/stores/list"

    const INPUT_PROPS = {
        title: "",
        description: "",
    }

    const store = useListStore()

    const input = reactive({...INPUT_PROPS})

    function clearInput() {
        Object.assign(input, INPUT_PROPS)

    }

    function handleSubmit(){
        if (Object.values(input).indexOf('') == 0) return
        const data = {
            ...input,
            description: "lotem ipsum"
        }
        store.insertListData(data)
        clearInput()
    }

    function handleDelete(index){
        // console.log("delete", index)
        store.removeListData(index)
    }

</script>

<template>
    <div class="container">
    <h2>Ini adalah halaman test Todo</h2>
    <form @submit.prevent="handleSubmit">
        <NormalInput 
            v-model="input.title"
            Id="name"
            Type="text"
            Placeholder="title"
        />
        <button class="submit">Add</button>
    </form>
    <ol>
        <template v-for="(item, index) in store.getList" :key="index">
            <li>{{ item.title }}<button @click="()=>handleDelete(index)">hapus</button></li>
        </template>
    </ol>
    </div>
</template>

<style scoped>
</style>