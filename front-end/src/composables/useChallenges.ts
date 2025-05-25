import { ref, computed } from 'vue'
import challengesService from '@/services/api/challenges'
import type { Challenge, ChallengeDetail, UserChallenge } from '@/types/challenges'

// 확장된 UserChallenge 타입 정의 (Challenge 메타데이터 포함)
type ExtendedUserChallenge = UserChallenge & {
  start_date?: string
  end_date?: string
  category_name?: string
  computed_status?: string
}

const useChallengesComposable = () => {
  // 사용자 개인 챌린지 목록
  const personalChallenges = ref<ExtendedUserChallenge[]>([])

  // 성공 또는 실패한 챌린지 필터
  const completedChallenges = computed(() =>
    personalChallenges.value.filter(c => c.status === '성공' || c.status === '실패')
  )

  // 진행 중인 챌린지 필터
  const ongoingChallenges = computed(() =>
    personalChallenges.value.filter(c => c.status === '도전중')
  )

  // 미참여 챌린지 목록
  const unjoinedChallenges = ref<Challenge[]>([])

  // 챌린지 상세 정보
  const challengeDetail = ref<ChallengeDetail | null>(null)

  // 날짜 포맷 함수 (YYYY.MM.DD)
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  // 챌린지 상세정보 표시용 가공 데이터
  const detailData = computed(() => {
    if (!challengeDetail.value) {
      return { title: '', goal: '', point: '', date: '' }
    }

    return {
      title: challengeDetail.value.title,
      goal: challengeDetail.value.content,
      point: `${challengeDetail.value.point}P`,
      date: `${formatDate(challengeDetail.value.start_date)} - ${formatDate(challengeDetail.value.end_date)}`
    }
  })

  // 사용자 개인 챌린지를 불러오고 Challenge 정보와 병합
  const fetchPersonalChallenges = async (type?: number) => {
    const userChallenges = await challengesService.fetchPersonalChallenges(type)
    const challengeList = await challengesService.fetchChallengeList(100)

    personalChallenges.value = userChallenges.map(uc => {
      const match = challengeList.find(c => c.challenge_id === uc.challenge.challenge_id)
      return {
        ...uc,
        status: uc.status,
        start_date: match?.start_date || '',
        end_date: match?.end_date || '',
        category_name: match?.category_name || '카테고리명',
        computed_status: uc.status
      }
    }) as ExtendedUserChallenge[]
  }

  // 미참여 챌린지 필터링
  const fetchUnjoinedChallenges = async (size: number) => {
    const all = await challengesService.fetchChallengeList(size)
    const joinedIds = personalChallenges.value.map(c => c.challenge.challenge_id)
    unjoinedChallenges.value = all.filter(ch => !joinedIds.includes(ch.challenge_id))
  }

  // 챌린지 상세 정보 가져오기
  const fetchChallengeDetail = async (id: number) => {
    const detail = await challengesService.fetchChallengeDetail(id)
    challengeDetail.value = detail
  }

  // 도전하기 기능
  const startChallenge = async (challengeId: number) => {
    try {
      const joined = await challengesService.joinChallenge(challengeId)

      // unjoined에서 제거
      unjoinedChallenges.value = unjoinedChallenges.value.filter(c => c.challenge_id !== challengeId)

      // 메타 정보 병합
      const allChallenges = await challengesService.fetchChallengeList(100)
      const matched = allChallenges.find(c => c.challenge_id === challengeId)

      personalChallenges.value.push({
        ...joined,
        start_date: matched?.start_date || '',
        end_date: matched?.end_date || '',
        category_name: matched?.category_name || '카테고리명',
        computed_status: '진행중'
      })
    } catch (error) {
      console.error('챌린지 도전 실패:', error)
      throw error
    }
  }

  return {
    personalChallenges,
    completedChallenges,
    ongoingChallenges,
    unjoinedChallenges,
    challengeDetail,
    detailData,
    fetchPersonalChallenges,
    fetchUnjoinedChallenges,
    fetchChallengeDetail,
    startChallenge, // ← 외부에서 사용 가능
  }
}

export default useChallengesComposable
