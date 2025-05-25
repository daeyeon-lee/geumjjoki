export interface Challenge {
  challenge_id: number
  title: string
  content: string
  goal_amount: string
  goal_days: number
  point: number
  start_date: string
  end_date: string
  category: number
  category_name: string
  is_active: boolean
  computed_status: string
}

export interface UserChallenge {
  user_challenge_id: number
  challenge: {
    challenge_id: number
    title: string
    goal_amount: string
    point: number
  }
  status: string
  target_expense: string
  previous_expense: string
  total_expense: string
  progress: string
  computed_progress: number
}

export interface ChallengeDetail extends Challenge {
  user_challenge_id?: number
  status?: string
  target_expense?: string
  previous_expense?: string
  total_expense?: string
  progress?: string
  computed_progress?: number
}

// 전체 챌린지 조회
// "challenges": [
//     {
//         "challenge_id": 20,
//         "title": "[여가] 한 달 소비 줄이기 - 20만원",
//         "content": "여가 지출을 한 달 동안 200,000원 이하로 줄이기",
//         "goal_amount": "200000.00",
//         "goal_days": 28,
//         "point": 1000,
//         "start_date": "2025-06-07T09:03:57.215385+09:00",
//         "end_date": "2025-09-04T09:03:57.215385+09:00",
//         "category": 9,
//         "category_name": "여가",
//         "is_active": true,
//         "computed_status": "예정"
//     },
// "total_count": 20,
// "pagination": {
//     "current_page": 1,
//     "page_size": 10,
//     "total_pages": 2,
//     "has_next": true,
//     "has_previous": false
// }

// 상세 조회
// {
//     "status": "success",
//     "code": 200,
//     "data": {
//         "challenge_id": 1,
//         "title": "[술·담배] 일주일 소비 줄이기 - 1만원",
//         "content": "술·담배 지출을 일주일 동안 10,000원 이하로 줄이기",
//         "goal_amount": "10000.00",
//         "goal_days": 7,
//         "point": 50,
//         "start_date": "2025-06-06T09:03:57.068621+09:00",
//         "end_date": "2025-07-05T09:03:57.068621+09:00",
//         "category": 2,
//         "category_name": "술·담배",
//         "is_active": true,
//         "challenge_host": null,
//         "computed_status": "예정"
//     }
// }

// 개인별 챌린지
// {
//     "user_challenge_id": 3,
//     "challenge": {
//         "challenge_id": 1,
//         "title": "[술·담배] 일주일 소비 줄이기 - 1만원",
//         "goal_amount": "10000.00",
//         "point": 50
//     },
//     "status": "성공",
//     "target_expense": "0.00",
//     "previous_expense": "0.00",
//     "total_expense": "0.00",
//     "progress": "0.00",
//     "computed_progress": 0
// },
