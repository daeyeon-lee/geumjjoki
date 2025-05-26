import expenseService from "@/services/api/expenseService"

const useExpenseComposable = () => {
    const getExpenseList = async () => {
        const expenseList = await expenseService.getExpenses()
        return expenseList
    }
    return { getExpenseList }
}

export default useExpenseComposable