import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 테스트용 axios 인스턴스 전역 접근 가능하도록 설정
import apiClient from '@/plugins/axios';
(window as any).apiClient = apiClient;

const app = createApp(App)
const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY

// Kakao SDK 초기화
if (window.Kakao) {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    console.log('Kakao SDK Initialized:', window.Kakao.isInitialized());
  }
} else {
  console.error('Kakao SDK script not loaded');
}

// 로컬 스토리지 변경 감지 이벤트 핸들러
window.addEventListener('storage', (event) => {
  if (event.key === 'access_token') {
    // 사용자 정의 이벤트 발생
    window.dispatchEvent(new CustomEvent('auth-state-changed', {
      detail: { token: event.newValue }
    }));
  }
});

// 액세스 토큰 변경 시 사용자 정의 이벤트 발생 함수
window.updateAuthState = function() {
  const token = localStorage.getItem('access_token');
  window.dispatchEvent(new CustomEvent('auth-state-changed', {
    detail: { token }
  }));
};

app.use(createPinia())
app.use(router)

app.mount('#app')
