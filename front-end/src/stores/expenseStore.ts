import { defineStore } from 'pinia'
import expenseService from '@/services/api/expenseService'
import type { Expense, ExpenseListResponse } from '@/types/expense'

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: [] as Expense[],
    totalAmount: 0,
    totalCount: 0,
    pagination: null as ExpenseListResponse['data']['pagination'] | null,
    isLoading: false,
    currentPage: 1,
    hasNext: true,
  }),
  actions: {
    async fetchExpenses({
      page = 1,
      page_size = 5,
      start_date,
      end_date,
      category,
      include_null_category = false,
    }: {
      page?: number;
      page_size?: number;
      start_date?: string;
      end_date?: string;
      category?: string[];
      include_null_category?: boolean;
    }) {
      this.isLoading = true;
      try {
        const params: {
          page: number;
          page_size: number;
          start_date?: string;
          end_date?: string;
          category?: string[];
          include_null_category?: boolean;
        } = {
          page,
          page_size,
        };
        if (start_date) params.start_date = start_date;
        if (end_date) params.end_date = end_date;
        if (category && category.length > 0) {
          params.category = category;
        }
        if (include_null_category) {
          params.include_null_category = true;
        }

        const res = await expenseService.getExpenses(params);
        if (page === 1) {
          this.expenses = res.data.expenses;
        } else {
          this.expenses = this.expenses.concat(res.data.expenses);
        }
        this.totalAmount = res.data.total_amount;
        this.totalCount = res.data.total_count;
        this.pagination = res.data.pagination;
        this.currentPage = res.data.pagination.current_page;
        this.hasNext = res.data.pagination.has_next;
      } catch (e) {
        console.error('지출 내역 불러오기 실패:', e);
      } finally {
        this.isLoading = false;
      }
    },
  }
});
