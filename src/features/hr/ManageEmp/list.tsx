import { Grid } from '@mui/material';
import React from 'react';
import { CoreAutocomplete } from '../../../components/atoms/CoreAutocomplete';
import { RequestFormStatus, RequestFormType } from '../../../enums';
import CoreButton from '../../../components/atoms/CoreButton';
import CoreTable from '../../../components/atoms/CoreTable';
import { useListEmp } from '../../../components/hooks/hr/manageEmp/useList';
import CoreInput from '../../../components/atoms/CoreInput';
import { useNavigate } from 'react-router-dom';

export const ListEmp = () => {
    const [{ control, columns, tableData, isLoading }, { handleSubmit, onReset, onSubmit }] = useListEmp();
    const navigate = useNavigate();

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container spacing={2} sx={{ padding: 5 }}>
                    <Grid size={{ xs: 4 }}>
                        <CoreInput
                            control={control}
                            name="search"
                            label="Tìm kiếm"
                            placeholder="Nhập tên hoặc địa chỉ"
                            variant='standard'
                        />
                    </Grid>

                    <Grid size={{ xs: 4 }}>
                        <CoreInput
                            control={control}
                            name="fullName"
                            label="Tên nhân viên"
                            placeholder="Nhập tên nhân viên"
                            variant='standard'
                        />
                    </Grid>

                    <Grid size={{ xs: 4 }}>
                        <CoreInput
                            control={control}
                            name="department"
                            label="Phòng ban"
                            placeholder="Nhập tên phòng ban"
                            variant='standard'
                        />
                    </Grid>
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                    <CoreButton sx={{ margin: 2, maxWidth: 100 }} variant="outlined" onClick={onReset}>
                        Làm mới
                    </CoreButton>
                    <CoreButton sx={{ margin: 2, maxWidth: 100 }} variant="outlined" type="submit">
                        Tìm kiếm
                    </CoreButton>
                </div>
            </form>
            <CoreButton sx={{ margin: 2, maxWidth: 120 }} variant="outlined" onClick={() => navigate('/hr/emp/add-new')}>
                Thêm mới
            </CoreButton>
            <CoreTable
                columns={columns}
                data={tableData?.data?.content}
                isLoading={isLoading}
                onRowClick={(row) => navigate(`/hr/emp/${row.id}?actionType=view`)}
            />
        </>
    );
};
