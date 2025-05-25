import expenseService from "@/services/api/expenseService"

const uesExpenseComposable = () => {
    const getExpenseList = async () => {
        const expenseList = await expenseService.getExpenses()
        return expenseList
    }
    return { getExpenseList }
}

export default uesExpenseComposable