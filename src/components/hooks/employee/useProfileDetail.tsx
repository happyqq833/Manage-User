import { useUser } from "../../../context/userProvider";
import { useSimpleApi } from "../../../hooks/useGetApi";
import { getDetailUser } from "../../../services/employee/getdetail";

export function useProfileDetail() {
    const { user } = useUser()
    const {
        data: userDetail,
        isLoading,

    } = useSimpleApi(() => getDetailUser(user?.id as string), [user?.id as string]);
    return { userDetail, isLoading } as const
}