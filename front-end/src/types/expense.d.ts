export interface Category {
  category_id: number;
  name: string;
  parent: string | null;
}

export interface Expense {
  expense_id: number
  amount: number
  date: string
  description: string
  category: Category | null
}

export interface Pagination {
  current_page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ExpenseListData {
  expenses: Expense[];
  total_amount: number;
  total_count: number;
  pagination: Pagination;
}

export interface ExpenseListResponse {
  status: string;           // "success" 등
  data: ExpenseListData;
}
