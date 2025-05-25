// Kakao SDK 및 window 확장 타입 선언
interface KakaoStatic {
  init(apiKey: string): void;
  isInitialized(): boolean;
  // 필요한 경우 추가 메서드 정의
}

interface Window {
  Kakao?: KakaoStatic;
  updateAuthState?: () => void;
}

// ES 모듈 시스템에서 전역 인터페이스를 확장하기 위한 선언
declare global {
  interface Window {
    Kakao?: KakaoStatic;
    updateAuthState?: () => void;
  }
}

export { KakaoStatic, Window };

