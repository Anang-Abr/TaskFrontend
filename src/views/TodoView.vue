<script setup>
    import NormalInput from "@/components/NormalInput.vue"
    import { onMounted, reactive } from "vue";
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
        try {  
            if (Object.values(input).indexOf('') == 0) return
            const data = {
                ...input,
                description: "lotem ipsum",
                category: 'A'
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
            Placeholder="title"
        />
        <button class="submit">Add</button>
    </form>
    <ol>
        <template v-for="(item, index) in store.getList" :key="index">
            <li :class="{'done': item.completed}" >{{ item.title }} 
                <button @click="()=>handleDelete(item.id)">hapus</button>
                <button v-if="!item.completed" @click="()=>handleDone(item.id, item)">Mark As Done</button>
                <button v-else @click="()=>handleUnone(item.id, item)">Undone</button>
            </li>
        </template>
    </ol>
    </div>
</template>

<style scoped>
    .done{
        text-decoration: line-through;
    }
</style>