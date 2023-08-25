<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore()

const data = authStore.getCred
</script>

<template>
  <main>
    <TheWelcome :name="data.name"/>
  </main>
</template>
