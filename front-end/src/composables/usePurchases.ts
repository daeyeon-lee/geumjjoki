import purchasesService from "@/services/api/purchases"
import type { RewardTransaction } from "@/types/purchases"

const usePurchasesComposable = () => {
    const fetchPurchaseList = async () => {
        const data = await purchasesService.fetchPurchaseList()
        return data as RewardTransaction[]
    }
    return { fetchPurchaseList }
}

export default usePurchasesComposable