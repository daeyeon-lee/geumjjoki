import apiClient from "@/plugins/axios";
import type { ExpenseListResponse, Expense, Category } from "@/types/expense";

export interface RootCategoryResponse {
  status: string
  data: Category[]
}

const expenseService = {
  getExpenses: async (params?: string | { page?: number; page_size?: number;[key: string]: any }): Promise<ExpenseListResponse> => {
    let response
    if (typeof params === 'string') {
      response = await apiClient.get(params)
    } else {
      response = await apiClient.get('/expenses/', { params })
    }
    console.log('getExpenses 호출', response.data)
    return response.data as ExpenseListResponse;
  },
  getExpenseDetail: async (expenseId: number): Promise<Expense> => {
    const response = await apiClient.get(`/expenses/${expenseId}/`);
    console.log('getExpenseDetail 호출', response.data.data)
    return response.data.data as Expense;
  },
  getSummary: async () => {
    const response = await apiClient.get('/expenses/summary/');
    console.log('getSummary 호출', response.data)
    return {
      current_month: response.data.data.current_month,
      previous_month: response.data.data.previous_month,
    }
  },
  updateExpenseCategory: async (expenseId: number, categoryId: number): Promise<Expense> => {
    const response = await apiClient.put(`/expenses/${expenseId}/`, {
      category: categoryId,
    });
    console.log('updateExpenseCategory 호출', response.data);
    return response.data as Expense;
  },
  getRootCategories: async () => {
    const response = await apiClient.get<RootCategoryResponse>('/expenses/categories/roots/')
    console.log('getRootCategories 호출', response.data)
    return response.data
  },
  updateExpenseDescription: async (expenseId: number, description: string) => {
    const response = await apiClient.put(`/expenses/${expenseId}/`, { description })
    console.log('updateExpenseDescription 호출', response.data)
    return response.data
  },
};

export default expenseService;