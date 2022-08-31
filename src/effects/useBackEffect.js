import { useRouter } from "vue-router";

// 回退
export const useBackEffect = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
    const handlePush = (name, params = {}) => {
        router.push({ name, params })
    }
    return { handleBack, handlePush };
};

