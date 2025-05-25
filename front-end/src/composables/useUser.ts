import userService from "@/services/api/userService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import type { UserChangeInfo, UserChangePassword } from "@/types/user";

// api 호출 작성
const useUserComposable = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  const changeUserInfo = async (userInfo: UserChangeInfo) => {
    const data = await userService.changeUserInfo(userInfo);
    await userStore.fetchUser()
    return data;
  }

  const changeUserPassword = async (userPassword: UserChangePassword) => {
    const data = await userService.changeUserPassword(userPassword);
    return data;
  }

  const deleteUser = async () => {
    const deleteResponseData = await userService.deleteUser();
    await authStore.logout();
    return deleteResponseData;
  }

  return { changeUserInfo, changeUserPassword, deleteUser };
}

export default useUserComposable;