import apiClient from "@/plugins/axios";
import type { UserChangeInfo, UserChangePassword } from "@/types/user";
const userService = {
  getUser: async () => {
    const response = await apiClient.get('/auth/user/');
    // console.log('getUser 호출', response);
    // console.log('getUser 호출', response.data);
    return response.data;
  },
  changeUserInfo: async (userInfo: UserChangeInfo) => {
    const response = await apiClient.put('/auth/user/', userInfo)
    return response.data
  },
  changeUserPassword: async (userPassword: UserChangePassword) => {
    const response = await apiClient.put('/auth/user/change-password/', userPassword)
    return response.data
  },
  deleteUser: async () => {
    const response = await apiClient.delete('/auth/user/')
    return response.data
  }
};

export default userService;
