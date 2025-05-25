import { useAuthStore } from "@/stores/authStore"
import axios from "axios"
import type { AxiosInstance } from "axios"

const BASE_URL = '/api/v1';

const getCookie = (name) => {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
	return match ? match[2] : ''
}

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
	'X-CSRFToken': getCookie('csrftoken')
  }
})


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('토큰 헤더 추가:', config.headers['Authorization']);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('error', error.response);
    console.log('originalRequest', originalRequest._retry);
    console.log('error.response?.status', error.response?.status);

    // 토큰 갱신이나 로그아웃 요청인 경우는 처리하지 않음
    if (originalRequest.url?.includes('/auth/token/refresh/') ||
        originalRequest.url?.includes('/auth/logout/')) {
      return Promise.reject(error);
    }

    // 401(Unauthorized) 또는 403(Forbidden) 에러 처리
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      const authStore = useAuthStore();
      originalRequest._retry = true;
      console.log('originalRequest._retry', originalRequest._retry);

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        // 토큰 갱신 요청은 인증 헤더 없이 보냄
        const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken
        });
        // console.log('response', response);

        const { access_token } = response.data.data;

        authStore.setToken(access_token);
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        // console.log('[axios][refresh] new access_token:', access_token);

        return apiClient(originalRequest);

      } catch (error) {
        console.error('토큰 갱신 실패:', error);
        // 로그아웃 요청도 인증 헤더 없이 보냄
        try {
          await axios.post(`${BASE_URL}/auth/logout/`)
          authStore.setToken(null)
          authStore.setRefreshToken(null)
        } catch (logoutError) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          authStore.setToken(null)
          authStore.setRefreshToken(null)
          console.error('로그아웃 실패:', logoutError);
        }
      }
    }
    return Promise.reject(error.response)
  }
)
export default apiClient