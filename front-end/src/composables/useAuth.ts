import { authService } from "@/services/api/authService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import type { LoginRequest, SignupRequest } from "@/types/user";
import { useRouter } from "vue-router";

const useAuth = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const router = useRouter();

  const kakaoLogin = () => {
    authService.kakaoLogin();
  };
  const naverLogin = () => {
    authService.naverLogin();
  };
  const emailDuplicationCheck = async (email: string): Promise<boolean> => {
    const data = await authService.emailDuplicationCheck(email);
    console.log(data)
    return data.data.duplication as boolean
  };
  const emailLogin = async (credential: LoginRequest) => {
    try {
      const response = await authService.emailLogin(credential)
      console.log(response)
      const accessToken = response.data.access_token
      const refreshToken = response.data.refresh_token

      // console.log(response.token)
      if (accessToken) {
        window.location.href = `/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}`;
      }
    } catch (error){
      console.error('로그인 실패', error)
      return {
        error: '로그인에 실패하였습니다.'
      }
    }
  }
  const emailSignup = async (signupRequest: SignupRequest) => {
    try {
      console.log(signupRequest)
      const response = await authService.emailSignup(signupRequest)
      console.log(response)
      if (response.status === 200) {
        const accessToken = response.data.access_token
        const refreshToken = response.data.refresh_token
        if (accessToken) {
          window.location.href = `/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}`;
        }
      } else {
        return {
          error: response.data.message
        }
      }
    } catch (error) {
      console.error('회원가입 실패', error)
      return {
        error: '회원가입에 실패하였습니다.'
      }
    }
  }

  // const emailLogin = async (credentials: LoginRequest) => {
  //   try {
  //     // API 호출
  //     const response = await authService.login(credentials);

  //     // 토큰 저장 및 인증 상태 업데이트
  //     await authStore.login(response.token);

  //     // 사용자 정보 로드
  //     await userStore.fetchUser();

  //     // 홈 페이지로 리다이렉트
  //     router.push({ name: 'home' });

  //     return { success: true };
  //   } catch (error) {
  //     console.error('로그인 실패:', error);
  //     return {
  //       success: false,
  //       error: error instanceof Error ? error.message : '로그인에 실패했습니다.'
  //     };
  //   }
  // };

  return {
    kakaoLogin,
    naverLogin,
    emailDuplicationCheck,
    emailLogin,
    emailSignup
  };
};

export default useAuth;
