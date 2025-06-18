import { useFormCustom } from "../../../../lib/form";

const defaultValues = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    department: '',
}

export const useSaveEmp = () => {


    const { control, handleSubmit, reset, setValue } = useFormCustom({ defaultValues });

    return [{ control }, { handleSubmit }] as const;
}