<template>
  <div
    class="fixed w-md bottom-0 left-1/2 -translate-x-1/2 flex flex-row items-center rounded-t-4xl bg-gray-200 py-0.5 px-5 gap-4 justify-center shadow-menu-bar">
    <MenuIcon v-for="(menu, index) in menus" :key="index" :variant="menu.isActive" @click="handleClick(index)">
      <template #icon>
        <component :is="menu.icon" />
      </template>
      <template #text>
        {{ menu.name }}
      </template>
    </MenuIcon>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, markRaw } from 'vue';
import MenuIcon from './MenuIcon.vue';
import { useRouter, useRoute } from 'vue-router';
import { MenuIcons } from '@/components/common/icons';
import type { Menu } from '@/types/menu';

const router = useRouter();
const route = useRoute();

const menus = ref<Menu[]>([
  {
    name: '소비',
    icon: markRaw(MenuIcons.MenuExpenseIcon),
    path: { name: 'expense' },
    isActive: false
  },
  {
    name: '리워드',
    icon: markRaw(MenuIcons.MenuRewardIcon),
    path: { name: 'reward' },
    isActive: false
  },
  {
    name: '홈',
    icon: markRaw(MenuIcons.MenuHomeIcon),
    path: { name: 'home' },
    isActive: false
  },
  {
    name: '챌린지',
    icon: markRaw(MenuIcons.MenuChallengeIcon),
    path: { name: 'challenge' },
    isActive: false
  },
  {
    name: '게시판',
    icon: markRaw(MenuIcons.MenuArticleIcon),
    path: { name: 'article' },
    isActive: false
  }
])

const getRootPath = (path: string) => {
  const root = path.split('/')[1] || '';
  return root === '' ? 'home' : root;
}

// 현재 경로가 변경될 때마다 active 상태 업데이트
watch(route, () => {
  const currentRoot = getRootPath(route.path)
  const activeIndex = menus.value.findIndex(menu => menu.path.name === currentRoot);
  if (activeIndex !== -1) {
    menus.value.forEach((menu, index) => {
      if (index === activeIndex) {
        menu.isActive = true;
      } else {
        menu.isActive = false;
      }
    });
  }
}, { immediate: true });

const handleClick = (index: number) => {
  menus.value[index].isActive = true;
  router.push(menus.value[index].path);
};
// 현재 경로가 변경될 때마다 active 상태 업데이트
// watch(route, () => {
//   const activeIndex = menus.value.findIndex(menu => menu.path.name === route.name);
//   if (activeIndex !== -1) {
//     menus.value.forEach((menu, index) => {
//       if (index === activeIndex) {
//         menu.isActive = true;
//       } else {
//         menu.isActive = false;
//       }
//     });
//   }
// }, { immediate: true });

// const handleClick = (index: number) => {
//   menus.value[index].isActive = true;
//   router.push(menus.value[index].path);
// };

</script>

<style></style>
