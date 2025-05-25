import type { Component } from 'vue';

export interface Menu {
  name: string;
  icon: Component;
  path: { name: string };
  isActive: boolean;
}
