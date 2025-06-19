import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFormCustom } from "../../../../lib/form";
import { User } from "../../../../services/hr/employee/getDetail/type";
import { useGetApi } from "../../../../hooks/useGetApi";
import { getDetailEmp } from "../../../../services/hr/employee/getDetail";
import { useEffect, useState } from "react";
import { useMutationApi } from "../../../../hooks/useMutationApi";
import { postEmp, putEmp } from "../../../../services/hr/employee/save";
import { toast } from "react-toastify";
import { deleteEmp } from "../../../../services/hr/employee/delete";

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
    const [open, setOpen] = useState(false);

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
    const deleteFn = useMutationApi(deleteEmp, {
        onSuccess: (res: any) => {
            toast.success(res.message || "Xoá thành công");
            setOpen(false);
        },
        onError: (err) => {
            toast.error(err.message || "Xoá thất bại");
        },
    });
    return [{ control, id, isView, isUpdate, open }, { handleSubmit, onSubmit, deleteFn, setOpen }] as const;
}