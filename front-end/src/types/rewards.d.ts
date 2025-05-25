export interface Reward {
    reward_id: number,
    name: string,
    description: string,
    point: number,
    thumbnail?: string | null,
    category: string,
}

// export interface RewardDetail extends Reward {
//     images: string[]
// }

// export interface RewardTransaction {
//   reward_transaction_id: number
//   status: number
//   redeemed_at: string
//   expire_at: string
//   reward: Reward
// }