import { toast } from "react-toastify";
import { useUser } from "../../../context/userProvider";
import { useMutationApi } from "../../../hooks/useMutationApi";
import { useFormCustom } from "../../../lib/form";
import { postRequestForm } from "../../../services/employee/createRequest";
import { RequestForm } from "../../../services/employee/createRequest/type";
import { useNavigate } from "react-router-dom";


const defaultValues: RequestForm = {
    id: '',
    name: 'leave',
    reason: '',
    createdBy: null,
    createdAt: '',
    status: 'pending'
};
export function useCreateRequest() {

    const { user } = useUser();
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useFormCustom<RequestForm>({ defaultValues });

    const {
        mutate,
    } = useMutationApi(postRequestForm, {
        onSuccess: (res: any) => {
            toast.success(res.message);
            navigate(`/employee/requests`);
        },
        onError: (err) => {
            toast.error(err.message || "Đã có lỗi xảy ra, vui lòng thử lại sau!");

        }
    });

    const onSubmit = (data: RequestForm) => {
        const requestData = {
            ...data,
            createdBy: {
                id: user?.id ?? '',
                username: user?.username ?? '',
                role: user?.role ?? '',
            },
            createdAt: new Date().toISOString(),
        };
        mutate(requestData);
    };




    return { onSubmit, control, handleSubmit, errors, isSubmitting, isValid, user } as const;
}