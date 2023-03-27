import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

//회원 전역상태 관리
export const userStore = create(
  devtools((set) => ({
    userId: 0, //유저 id(번호)
    userNickname: '', //유저 닉네임
    userImg: '', //유저 프로필 사진
    userRole: 'reader', //역할
    accessToken: '', //액세스 토큰

    setUserId: (userId) => set({ userId }),
    setUserNickname: (userNickname) => set({ userNickname }),
    setUserImg: (userImg) => set({ userImg }),
    setUserRole: (userRole) => set({ userRole }),
    setToken: (accessToken) => set({ accessToken }),
    resetUser: () =>
      set({
        userId: 0,
        userNickname: '',
        userImg: '',
        userRole: 'reader',
        accessToken: '',
      }),
  })),
);
