<script setup>
    import NormalInput from "@/components/NormalInput.vue"
    import { onMounted, reactive } from "vue";
    import { useListStore } from "@/stores/list"

    const INPUT_PROPS = {
        title: "",
        description: "",
        category: ""
    }

    const store = useListStore()

    const input = reactive({...INPUT_PROPS})

    function clearInput() {
        Object.assign(input, INPUT_PROPS)
    }

    function handleSubmit(){
        try {  
            if (Object.values(input).indexOf('') == 0) return
            const data = {
                ...input
            }
            store.insertListData(data)
            clearInput()
        } catch (error) {
            alert(error)
        }
    }

    function handleDelete(index){
        store.removeListData(index)
    }

    function handleDone(index, body){
        store.updateList(index, {...body, completed: true})
    }
    function handleUnone(index, body){
        store.updateList(index, {...body, completed: false})
    }

onMounted(()=>{
    store.initList()
})
</script>

<template>
    <div class="container">
    <h2>Ini adalah halaman test Todo</h2>
    <form @submit.prevent="handleSubmit">
        <NormalInput 
            v-model="input.title"
            Id="name"
            Type="text"
            Placeholder="Title"
        />
        <NormalInput 
            v-model="input.description"
            Id="description"
            Type="text"
            Placeholder="Description"
        />
        <NormalInput 
            v-model="input.category"
            Id="category"
            Type="text"
            Placeholder="Category"
        />
        <button class="submit">Add</button>
    </form>
    <ol>
        <template v-for="(item, index) in store.getList" :key="index">
            <li :class="['test']" >
                <span :class="{'done': item.completed}">{{ index+1 }}. {{ item.title  }}</span>
                <div>
                <button @click="()=>handleDelete(item.id)">hapus</button>
                <button v-if="!item.completed" @click="()=>handleDone(item.id, item)">Mark As Done</button>
                <button v-else @click="()=>handleUnone(item.id, item)">Undone</button>
                </div>
            </li>
            <p>{{ item.description }}</p>
        </template>
    </ol>
    </div>
</template>

<style lang="scss" scoped>

    ol{
        list-style-position: inside;
        list-style-type: decimal;
        padding: 0;
    }
    .done {
        text-decoration: line-through;
    }

    .test{
        display: flex;
        justify-content: space-between;
        list-style-position: inside;
        list-style-type: decimal;
    }
</style>