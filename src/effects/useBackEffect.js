import { useRouter } from "vue-router";

// 回退
export const useBackEffect = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
    return { handleBack };
};