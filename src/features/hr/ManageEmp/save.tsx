import { Grid } from '@mui/material';

import React from 'react';
import CoreInput from '../../../components/atoms/CoreInput';
import { useSaveEmp } from '../../../components/hooks/hr/manageEmp/useSave';

export const SaveEmp = () => {
    const [{ control }] = useSaveEmp()
    return (
        <form>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CoreInput
                        control={control}
                        name='fullName'
                        label='Họ và tên'
                        placeholder='Nhập họ và tên'
                        variant='standard'
                    />
                </Grid>


            </Grid>
        </form>
    )
}