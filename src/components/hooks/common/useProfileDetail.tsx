import { toast } from "react-toastify";
import { useUser } from "../../../context/userProvider";
import { useGetApi } from "../../../hooks/useGetApi";
import { useMutationApi } from "../../../hooks/useMutationApi";
import { useFormCustom } from "../../../lib/form";
import { getDetailUser } from "../../../services/employee/getdetail";
import { UserInfo } from "../../../services/employee/getdetail/type";
import { putEmp } from "../../../services/hr/employee/save";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";


const defaultValues: UserInfo = {
    id: '',
    username: '',
    fullName: '',
    dob: '',
    phone: '',
    address: '',
    department: '',
    position: '',
    role: `employee`,
    avatar: '',
}
export function useProfileDetail() {
    const navigate = useNavigate()
    const { user } = useUser()
    const [searchParams] = useSearchParams();
    const actionType = searchParams.get("actionType");
    const isView = actionType === "view";

    const { control, handleSubmit, reset } = useFormCustom<UserInfo>({ defaultValues })
    const id = user?.id as string

    const {
        data,
        isLoading,
    } = useGetApi(() => getDetailUser(id), [id]);

    useEffect(() => {
        reset({ ...data })
    }, [data])

    const { mutate } = useMutationApi(
        putEmp, {
        onSuccess: (res: any) => {
            const mess = res.message
            toast.success(mess);
            navigate(`/employee/profile?actionType=view`);
        },
        onError: (err) => {
            toast.error(err.message || "Đã có lỗi xảy ra, vui lòng thử lại sau!");

        }
    });


    const onSubmit = (data: UserInfo) => {
        mutate({ ...data })
    }


    return [{ control, isView, isLoading, user }, { handleSubmit, onSubmit }] as const
}