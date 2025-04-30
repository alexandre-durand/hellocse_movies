<template>
    Child {{ routeID }}
</template>

<script setup lang="ts">
const route = useRoute()


const routeID = computed(() => {
    return route.params.id
})
</script>