import { axiosInstance } from '../lib/axios';
import {create} from 'zustand';

import { useAuthStore } from './useAuthStore';
import toast from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
    isUpdatingProfile: false,

    updateProfile: async (data) => {
        set({isUpdatingProfile: true})
        try {
            const res = await axiosInstance.put("/user/update-pfp", data);
            useAuthStore.setState({ authUser: res.data });
            console.log("updated profile")
            toast.success("your profile is updated")
        }
            catch (error) {
                console.error("Error updating profile:", error);
                toast.error("Failed to update profile");
            } finally {
                set({ isUpdatingProfile: false });
            }
    }
})) 