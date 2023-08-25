<script setup>
    import NormalInput from "@/components/NormalInput.vue"
    import {onMounted, reactive} from "vue"
    import { useAuthStore } from "@/stores/auth.js"

    const authStore = useAuthStore()
    const INPUT_PROPS = {
        username: "",
        email:"",
        password: ""
    }

    const input = reactive({...INPUT_PROPS})

    async function handleSubmit(){
        try {
            const res = await authStore.login(input)
            if(!res) await authStore.logout()
            else{
                authStore.setUser()
                alert("login successful")
            }
        } catch (error) {
            alert(error)
            await authStore.logout()
        }
    }

onMounted(()=>{
    console.log("authStore.getCred")
    console.log(authStore.getCred)
})
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <NormalInput  
            Id="name"
            Placeholder="Name"
            Type="text"
            v-model="input.name"
        />
        <NormalInput  
            Id="username"
            Placeholder="Username"
            Type="text"
            v-model="input.username"
        />
        <NormalInput  
            Id="password"
            Placeholder="Password"
            Type="password"
            v-model="input.password"
        />
        <div>
            <button type="submit">Login</button>
        </div>
    </form>
</template>

<style scoped>
    form{
        display: flex;
        flex-direction: column;
    }
</style>