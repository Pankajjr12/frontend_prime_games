

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dayjs } from 'dayjs';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  // Correct import for AdapterDayjs
import { DatePicker } from '@mui/x-date-pickers';
interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const CouponForm = () => {
  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: '',
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required('Coupon code is required')
        .min(3, 'Code should be at least 3 characters')
        .max(20, 'Code should be at most 20 characters'),
      discountPercentage: Yup.number()
        .required('Discount percentage is required')
        .min(1, 'Discount should be at least 1%')
        .max(100, 'Discount cannot exceed 100%'),
      validityStartDate: Yup.date()
        .nullable()
        .required('Start date is required')
        .typeError('Invalid date'),
      validityEndDate: Yup.date()
        .nullable()
        .required('End date is required')
        .typeError('Invalid date')
        .min(Yup.ref('validityStartDate'), 'End date cannot be before start date'),
      minimumOrderValue: Yup.number()
        .required('Minimum order value is required')
        .min(1, 'Minimum order value should be at least 1'),
    }),
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        validityStartDate: values.validityStartDate
          ? values.validityStartDate.toISOString()
          : null,
        validityEndDate: values.validityEndDate
          ? values.validityEndDate.toISOString()
          : null,
      };
      console.log('Form Values:', formattedValues);
      // Submit form values to the backend
    },
  });

  return (
    <div className="max-w-3xl">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="code"
                name="code"
                label="Coupon Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="discountPercentage"
                name="discountPercentage"
                label="Discount Percentage"
                type="number"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                sx={{ width: '100%' }}
                label="Validity Start Date"
                value={formik.values.validityStartDate}
                onChange={(date) => formik.setFieldValue('validityStartDate', date)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                sx={{ width: '100%' }}
                label="Validity End Date"
                value={formik.values.validityEndDate}
                onChange={(date) => formik.setFieldValue('validityEndDate', date)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="minimumOrderValue"
                name="minimumOrderValue"
                label="Minimum Order Value"
                type="number"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
                helperText={formik.touched.minimumOrderValue && formik.errors.minimumOrderValue}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
                fullWidth
                disabled={false} // Set this to true during loading
              >
                {false ? (
                  <CircularProgress size="small" sx={{ width: '27px', height: '27px' }} />
                ) : (
                  'Create Coupon'
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default CouponForm;
