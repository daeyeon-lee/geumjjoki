import apiClient from "@/plugins/axios";
import type { LoginRequest, SignupRequest } from "@/types/user";

export const authService = {
  emailLogin: async (credential: LoginRequest) => {
    const response = await apiClient.post('/auth/email-login/', credential);
    return response.data;
  },
  kakaoLogin: () => {
    // 카카오 로그인 요청 redirect url로 리다이렉트
    const redirectUrl = `${apiClient.getUri()}/auth/kakao-login/`;
    window.location.href = redirectUrl;
  },
  emailDuplicationCheck: async (email: string) => {
    const params = {
      email: email
    }
    const response = await apiClient.get('/auth/email-check/', { params })
    return response.data
  },
  naverLogin: () => {
    const redirectUrl = `${apiClient.getUri()}/auth/naver-login/`;
    window.location.href = redirectUrl;
  },
  logout: async () => {
    const response = await apiClient.post('/auth/logout/')
    return response.data
  },
  emailSignup: async (signupRequest: SignupRequest) => {
    const response = await apiClient.post('/auth/email-signup/', signupRequest)
    return response.data
  }
};

export default authService;
