<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-start gap-6 my-4 px-4">
      <RouterLink v-for="(route, idx) in testChildRoutes" :key="route.name" :to="{ name: route.name }"
        class="cursor-pointer font-bold" :class="isActive(route) ? 'text-brown-600' : 'text-gray-600'">
        {{ route.meta?.title || route.name }}
      </RouterLink>
    </div>
    <router-view class="px-4" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { testRoutes } from '@/router/routes/testRoutes'
import { computed } from 'vue'

const route = useRoute()

const testChildRoutes = computed(() => testRoutes[0]?.children || [])

function isActive(r: any) {
  return route.name === r.name
}
</script>