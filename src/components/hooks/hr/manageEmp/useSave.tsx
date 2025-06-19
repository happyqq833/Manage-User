import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFormCustom } from "../../../../lib/form";
import { User } from "../../../../services/hr/employee/getDetail/type";
import { useGetApi } from "../../../../hooks/useGetApi";
import { getDetailEmp } from "../../../../services/hr/employee/getDetail";
import { useEffect } from "react";
import { useMutationApi } from "../../../../hooks/useMutationApi";
import { postEmp, putEmp } from "../../../../services/hr/employee/save";
import { toast } from "react-toastify";

const defaultValues: User = {
    id: '',
    username: '',
    fullName: '',
    dob: '',
    phone: '',
    address: '',
    department: '',
    position: '',
    role: 'employee',
    avatar: '',
}

export const useSaveEmp = () => {

    const [searchParams] = useSearchParams();
    const actionType = searchParams.get("actionType");
    const { id } = useParams<{ id: string }>();
    const isView = actionType === "view";
    const isUpdate = !!id
    const navigate = useNavigate()
    const { control, handleSubmit, reset, setValue } = useFormCustom<User>({ defaultValues });

    const { data } = useGetApi(() => getDetailEmp({ id }), [id])


    useEffect(() => {
        if (id && data) {
            reset({ ...data })
        }
    }, [id, data])

    const { mutate } = useMutationApi(
        isUpdate ? putEmp : postEmp, {
        onSuccess: (res: any) => {
            const mess = res.message
            const newId = res.data.id
            toast.success(mess);
            navigate(`/hr/emp/${newId}?actionType=view`);
        },
        onError: (err) => {
            toast.error(err.message || "Đã có lỗi xảy ra, vui lòng thử lại sau!");

        }
    });

    const onSubmit = (data: User) => {
        mutate({ ...data })
    }

    return [{ control, id, isView, isUpdate }, { handleSubmit, onSubmit }] as const;
}