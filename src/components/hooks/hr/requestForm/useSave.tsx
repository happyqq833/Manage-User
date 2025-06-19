import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetApi } from "../../../../hooks/useGetApi";
import { getDetailForm } from "../../../../services/hr/form/getDetail";
import { useFormCustom } from "../../../../lib/form";
import { Request } from "../../../../services/hr/form/save/type";
import { useEffect } from "react";
import { useMutationApi } from "../../../../hooks/useMutationApi";
import { putForm } from "../../../../services/hr/form/save";
import { toast } from "react-toastify";


const defaultValues: Request = {
    id: '',
    name: '',
    reason: '',
    createdBy: null,
    createdAt: '',
    status: 'pending'
}

export const useSaveForm = () => {

    const [searchParams] = useSearchParams();
    const actionType = searchParams.get("actionType");
    const isView = actionType === "view";
    const { id } = useParams<{ id: string }>();
    const { control, reset, handleSubmit } = useFormCustom<Request>({ defaultValues })
    const navigate = useNavigate()


    const { data } = useGetApi(() => getDetailForm(id as string), [id])

    useEffect(() => {
        if (id && data) {
            reset({ ...data })
        }
    }, [id, data])
    const { mutate } = useMutationApi(
        putForm, {
        onSuccess: (res: any) => {
            const mess = res.message
            const newId = res.data.id
            toast.success(mess);
            navigate(`/hr/form/list`);
        },
        onError: (err) => {
            toast.error(err.message || "Đã có lỗi xảy ra, vui lòng thử lại sau!");

        }
    });

    const onSubmit = (data: Request) => {
        mutate({ ...data })
    }

    return [{ id, control, isView }, {}] as const
}