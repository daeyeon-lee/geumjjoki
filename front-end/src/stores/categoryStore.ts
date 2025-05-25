import { defineStore } from 'pinia'
import expenseService from '@/services/api/expenseService'
import type { Category } from '@/types/expense'



export const useCategoryStore = defineStore('category', {
  state: () => ({
    rootCategories: [] as Category[],
    isLoaded: false,
    _loading: false,
  }),
  actions: {
    async fetchRootCategories() {
      if (this.isLoaded || this._loading) return
      this._loading = true
      try {
        const response = await expenseService.getRootCategories()
        console.log(response)
        this.rootCategories = response.data
        this.isLoaded = true
      } finally {
        this._loading = false
      }
    },
  },
})