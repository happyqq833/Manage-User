import React from 'react';
import { useListRequestForm } from '../../../components/hooks/hr/requestForm/useList';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/system';
import { CoreAutocomplete } from '../../../components/atoms/CoreAutocomplete';
import { RequestFormStatus, RequestFormType } from '../../../enums';
import CoreButton from '../../../components/atoms/CoreButton';
import CoreTable from '../../../components/atoms/CoreTable';

export const ListFormRequest = () => {
    const [{ control, columns, tableData, isLoading }, { handleSubmit, onReset, onSubmit }] = useListRequestForm();
    const navigate = useNavigate()

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container spacing={2} sx={{ padding: 3 }}>
                    <Grid size={{ xs: 6 }}>
                        <CoreAutocomplete
                            control={control}
                            name="name"
                            label="Loại đơn"
                            options={RequestFormType}

                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <CoreAutocomplete
                            control={control}
                            name="status"
                            label="Trạng thái"
                            options={RequestFormStatus}

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
            <CoreTable
                columns={columns}
                data={tableData?.data?.content}
                isLoading={isLoading}
                onRowClick={(row) => navigate(`/hr/form/${row.id}?actionType=view`)}
            />
        </>
    );
}