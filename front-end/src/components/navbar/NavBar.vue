<template>
  <div class="w-full flex justify-start gap-6 my-7 pl-3">
    <div v-for="(menu, idx) in menus" :key="menu.name" @click="goTo(menu)" class="cursor-pointer h3 fw-black"
      :class="activeIndex === idx
        ? 'text-brown-600'
        : 'text-gray-600'">
      {{ menu.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
  menus: { name: string, to: string }[]
}>()

const route = useRoute()
const router = useRouter()


const activeIndex = computed(() =>
  props.menus.findIndex(menu => route.path.endsWith(menu.to))
)


function goTo(menu: { to: string }) {
  router.push(menu.to)
}
</script>
