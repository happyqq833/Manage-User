import { useUser } from "../../../context/userProvider";
import { useGetApi } from "../../../hooks/useGetApi";
import { getDetailUser } from "../../../services/employee/getdetail";

export function useProfileDetail() {
    const { user } = useUser()
    const {
        data: userDetail,
        isLoading,

    } = useGetApi(() => getDetailUser(user?.id as string), [user?.id as string]);
    return { userDetail, isLoading } as const
}