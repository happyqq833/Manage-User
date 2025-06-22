import React from 'react';
import { useSaveForm } from '../../../components/hooks/hr/requestForm/useSave';
import { Grid } from '@mui/system';
import { Typography } from '@mui/material';
import CoreInput from '../../../components/atoms/CoreInput';
import CoreButton from '../../../components/atoms/CoreButton';
import { useNavigate } from 'react-router-dom';
import { CoreAutocomplete } from '../../../components/atoms/CoreAutocomplete';
import { RequestForm, RequestFormStatusType } from '../../../enums';

export const SaveFormRequest = () => {

    const [value, handle] = useSaveForm()
    const { control, isView, id } = value
    const { handleSubmit, onSubmit } = handle
    const navigate = useNavigate()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4} padding={4}>
                <Grid size={12} >
                    <Typography align='center' >Phê duyệt đơn từ</Typography>
                </Grid>
                <Grid size={4}>

                    <CoreAutocomplete
                        control={control}
                        name='name'
                        label='Loại đơn'
                        options={RequestForm}
                    />
                </Grid>
                <Grid size={4}>

                    <CoreInput
                        control={control}
                        name='createdBy.username'
                        label='Người làm đơn'
                        placeholder='Nhập loại đơn'
                        variant='standard'
                        disabled
                    />
                </Grid>
                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='reason'
                        label='Lý do'
                        placeholder='Nhập lý do'
                        variant='standard'
                        disabled

                    />

                </Grid>
                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='createdAt'
                        label='Ngày làm đơn'
                        placeholder='Nhập lý do'
                        variant='standard'
                        disabled

                    />

                </Grid>
                <Grid size={4}>
                    <CoreAutocomplete
                        control={control}
                        name='status'
                        label='Trạng thái'
                        options={RequestFormStatusType}
                    />

                </Grid>

                <Grid size={12}>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <CoreButton sx={{ margin: 2, maxWidth: 100 }} variant="outlined" onClick={() => navigate('/hr/form/list')} >
                            Back
                        </CoreButton>

                        {isView ? (<CoreButton
                            key={'editBtn'}
                            sx={{ margin: 2, maxWidth: 120 }}
                            variant="outlined"
                            onClick={() => navigate(`/hr/form/${id}`)}
                        >
                            Phê duyệt
                        </CoreButton>) : (<CoreButton
                            key={'saveBtn'}
                            sx={{ margin: 2, maxWidth: 100 }}
                            variant="outlined"
                            type="submit"
                        >
                            Lưu
                        </CoreButton>)}
                    </div>
                </Grid>
            </Grid>
        </form >
    )
}