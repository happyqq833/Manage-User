import { Grid } from '@mui/material';
import React from 'react';
import { CoreAutocomplete } from '../../components/atoms/CoreAutocomplete';
import { useListRequest } from '../../components/hooks/employee/useListRequest';
import { RequestFormStatus, RequestFormType } from '../../enums';
import CoreButton from '../../components/atoms/CoreButton';
import CoreTable from '../../components/atoms/CoreTable';

export const ListRequest = () => {
    const [value, handle] = useListRequest();
    const { control, columns, tableData, isLoading, query, total } = value
    const { handleSubmit, onReset, onSubmit, onPageChange, onRowsPerPageChange } = handle

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
                page={(query.page ?? 1) - 1}
                rowsPerPage={query.size}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                total={total}
            />
        </>
    );
};
