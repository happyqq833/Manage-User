import { Grid, Typography } from '@mui/material';

import React from 'react';
import CoreInput from '../../../components/atoms/CoreInput';
import { useSaveEmp } from '../../../components/hooks/hr/manageEmp/useSave';
import { CoreAutocomplete } from '../../../components/atoms/CoreAutocomplete';
import { RoleType } from '../../../enums';
import CoreButton from '../../../components/atoms/CoreButton';
import { useNavigate } from 'react-router-dom';

export const SaveEmp = () => {
    const [value, handle] = useSaveEmp()

    const { control, isView, id } = value
    const { handleSubmit, onSubmit } = handle
    const navigate = useNavigate()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4} padding={4}>
                <Grid size={12} >
                    <Typography align='center' >Chi tiết nhân viên</Typography>
                </Grid>
                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='fullName'
                        label='Họ và tên'
                        placeholder='Nhập họ và tên'
                        variant='standard'
                        disabled={isView}
                    />

                </Grid>
                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='username'
                        label='Tên đăng nhập'
                        placeholder='Nhập tên đăng nhập'
                        variant='standard'
                        disabled={isView}

                    />

                </Grid>
                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='dob'
                        label='Ngày sinh'
                        placeholder='Nhập ngày sinh'
                        variant='standard'
                        disabled={isView}

                    />

                </Grid>

                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='department'
                        label='Phòng ban'
                        placeholder='Nhập phòng ban'
                        variant='standard'
                        disabled={isView}

                    />

                </Grid>
                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='position'
                        label='Vị trí'
                        placeholder='Nhập vị trí'
                        variant='standard'
                        disabled={isView}

                    />

                </Grid>
                <Grid size={4}>
                    <CoreAutocomplete
                        control={control}
                        name='role'
                        label='Phân loại'
                        options={RoleType}

                    />

                </Grid>
                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='phone'
                        label='Số điện thoại'
                        placeholder='Nhập số điện thoại'
                        variant='standard'
                        disabled={isView}

                    />
                </Grid>

                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='address'
                        label='Địa chỉ'
                        placeholder='Nhập địa chỉ'
                        variant='standard'
                        disabled={isView}

                    />
                </Grid>
                <Grid size={12}>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <CoreButton sx={{ margin: 2, maxWidth: 100 }} variant="outlined" onClick={() => navigate('/hr/emp/list')} >
                            Back
                        </CoreButton>
                        {isView ? (
                            <>
                                <CoreButton
                                    key={'editBtn'}
                                    sx={{ margin: 2, maxWidth: 120 }}
                                    variant="outlined"
                                    onClick={() => navigate(`/hr/emp/${id}`)}
                                >
                                    Chỉnh sửa
                                </CoreButton>
                                <CoreButton
                                    key={'deleteBtn'}
                                    sx={{ margin: 2, maxWidth: 120 }}
                                    variant="outlined"
                                    onClick={() => navigate(`/hr/emp/${id}`)}
                                >
                                    Xóa
                                </CoreButton>
                            </>


                        ) : (
                            <CoreButton
                                key={'saveBtn'}
                                sx={{ margin: 2, maxWidth: 100 }}
                                variant="outlined"
                                type="submit"
                            >
                                Lưu
                            </CoreButton>
                        )}

                    </div>

                </Grid>

            </Grid>
        </form>
    )
}