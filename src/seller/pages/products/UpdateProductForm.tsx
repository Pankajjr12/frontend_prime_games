import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { pcLevelTwo } from '../../../data/pc/levelTwoPc';
import { psLevelTwo } from '../../../data/ps/levelTwoPs';
import { trendingLevelTwo } from '../../../data/trending/levelTwoTrending';
import { deviceTwo } from '../../../data/appliances/deviceLlevelTwo';
import { pcLevelThree } from '../../../data/pc/levelThreePc';
import { psLevelThree } from '../../../data/ps/levelThreePs';
import { trendLevelThree } from '../../../data/trending/levelThreeTrending';
import { deviceThree } from '../../../data/appliances/deviceLevelThree';
import { Seller } from '../../../types/sellerTypes';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { updateProduct } from '../../../state/Seller/sellerProductSlice';
import { uploadToCloudinary } from '../../../utils/uploadToCloudinary';
import { fetchProductById } from '../../../state/Customer/productSlice';
import { Alert, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { byYear } from '../../../data/filter/byYear';

const categoryTwo: { [key: string]: any[] } = {
  pc: pcLevelTwo,
  ps: psLevelTwo,
  trending: trendingLevelTwo,
  devices: deviceTwo,
  new_games: [],
};

const categoryThree: { [key: string]: any[] } = {
  pc: pcLevelThree,
  ps: psLevelThree,
  trending: trendLevelThree,
  devices: deviceThree,
  new_games: [],
};

const validationSchema = Yup.object({
  title: Yup.string()
      .min(5, "Title should be at least 5 characters long")
      .required("Title is required"),
  description: Yup.string()
      .min(10, "Description should be at least 10 characters long")
      .required("Description is required"),
  price: Yup.number()
      .positive("Price should be greater than zero")
      .required("Price is required"),
  discountedPrice: Yup.number()
      .positive("Discounted Price should be greater than zero")
      .required("Discounted Price is required"),
  discountPercent: Yup.number()
      .positive("Discount Percent should be greater than zero")
      .required("Discount Percent is required"),
  quantity: Yup.number()
      .positive("Quantity should be greater than zero")
      .required("Quantity is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  years: Yup.string().required("Sizes are required"),
})

interface FormValues {
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  quantity: number;
  brand: string;
  images: string[];
  category: any;
  years: string;
  seller:Seller | undefined,
  createdAt:any,
  numRatings:number;
  in_stock: boolean;
}

const UpdateProductForm = () => {
  const [uploadImage, setUploadingImage] = useState(false);
  const dispatch = useAppDispatch();
  const { sellers, sellerProduct, products } = useAppSelector(store => store);
  const { productId } = useParams();

  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const formik = useFormik<FormValues>({
      initialValues:
      {
          title: "",
          description: "",
          mrpPrice: 0,
          sellingPrice: 0,
          quantity: 0,
          brand: "",
          images: [],
          category: null,
          years: "",
          seller:undefined,
          createdAt:null,
          numRatings:0,
          in_stock: true,
      },
      // validationSchema: validationSchema,
      onSubmit: (values) => {

        const { mrpPrice, sellingPrice } = values;
    
        // Calculate the discount percent
        const discountPercent = ((mrpPrice - sellingPrice) / mrpPrice) * 100;
        
        // Update values with the calculated discount percent
       
          dispatch(updateProduct({ productId:Number(productId),product:values}))
          console.log(values);
      },
  });

  const handleImageChange = async (event: any) => {
      const file = event.target.files[0];
      setUploadingImage(true);
      const image = await uploadToCloudinary(file);
      // const image = URL.createObjectURL(file);
      formik.setFieldValue("images", [...formik.values.images, image]);
      setUploadingImage(false);
  };

  const handleRemoveImage = (index: number) => {
      const updatedImages = [...formik.values.images];
      updatedImages.splice(index, 1);
      formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
      return category.filter((child: any) => {
          // console.log("Category", parentCategoryId, child)
          return child.parentCategoryId == parentCategoryId;
      });
  };

  const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
  }
  useEffect(() => {
      dispatch(fetchProductById(Number(productId)));
  }, [productId])

  useEffect(() => {
      if (sellerProduct.productCreated || sellerProduct.error) {
          setOpenSnackbar(true)
      }
  }, [sellerProduct.productCreated, sellerProduct.error])

  useEffect(() => {
      formik.setValues({

          title: products.product?.title || "",
          description: products.product?.description || "",
          mrpPrice: products.product?.mrpPrice || 0,
          sellingPrice: products.product?.sellingPrice || 0,
          quantity: products.product?.quantity || 0,
          brand: products.product?.brand || "",
          images: products.product?.images || ["image/"],
          category:  products.product?.category,
          
          years: products.product?.years ||  "",
          seller:products.product?.seller ,

          createdAt:products.product?.createdAt || "",
          numRatings:products.product?.numRatings || 0,
          in_stock: products.product?.in_stock || true,

      })
  }, [products.product])
  return (
    <div>
    <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
                <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />

                <label className="relative" htmlFor="fileInput">
                    <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                        <AddPhotoAlternateIcon className="text-gray-700" />
                    </span>
                    {uploadImage && (
                        <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                            <CircularProgress />
                        </div>
                    )}
                </label>

                <div className="flex flex-wrap gap-2">
                    {formik.values.images.map((image, index) => (
                        <div className="relative">
                            <img
                                className="w-24 h-24 object-cover"
                                key={index}
                                src={image}
                                alt={`ProductImage ${index + 1}`}
                            />
                            <IconButton
                                onClick={() => handleRemoveImage(index)}
                                className=""
                                size="small"
                                color="error"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    outline: "none",
                                }}
                            >
                                <CloseIcon sx={{ fontSize: "1rem" }} />
                            </IconButton>
                        </div>
                    ))}
                </div>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.description && Boolean(formik.errors.description)
                    }
                    helperText={formik.touched.description && formik.errors.description}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <TextField
                    fullWidth
                    id="mrp_price"
                    name="mrpPrice"
                    label="MRP Price"
                    type="number"
                    value={formik.values.mrpPrice}
                    onChange={formik.handleChange}
                    error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
                    helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <TextField
                    fullWidth
                    id="sellingPrice"
                    name="sellingPrice"
                    label="Selling Price"
                    type="number"
                    value={formik.values.sellingPrice}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.sellingPrice &&
                        Boolean(formik.errors.sellingPrice)
                    }
                    helperText={
                        formik.touched.sellingPrice && formik.errors.sellingPrice
                    }
                    required
                />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <FormControl
                    fullWidth
                    error={formik.touched.years && Boolean(formik.errors.years)}
                    required
                >
                    <InputLabel id="color-label">Year</InputLabel>
                    <Select
                        labelId="color-label"
                        id="color"
                        name="color"
                        value={formik.values.years}
                        onChange={formik.handleChange}
                        label="Color"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {byYear.map((color, index) => <MenuItem value={color.value}>
                            <div className="flex gap-3">
                                <span style={{ backgroundColor: color.label }} className={`h-5 w-5 rounded-full ${color.value === "White" ? "border" : ""}`}></span>
                                <p>{color.value}</p>
                            </div>
                        </MenuItem>)}
                    </Select>
                    {formik.touched.years && formik.errors.years && (
                        <FormHelperText>{formik.errors.years}</FormHelperText>
                    )}
                </FormControl>
            </Grid>
             <Grid item xs={12} sm={6} lg={3}>
                        <TextField
                          fullWidth
                          id="brand"
                          name="brand"
                          label="Brand"
                          value={formik.values.brand}
                          onChange={formik.handleChange}
                          error={formik.touched.brand && Boolean(formik.errors.brand)}
                          helperText={formik.touched.brand && formik.errors.brand}
                          required
                        />
                      </Grid>
          
       
            <Grid item xs={12}>
                <Button
                    sx={{ p: "14px" }}
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={sellerProduct.loading}
                >
                    {sellerProduct.loading ? <CircularProgress size="small"
                        sx={{ width: "27px", height: "27px" }} /> : "Update Product"}
                </Button>
            </Grid>
        </Grid>
    </form>
    <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen} autoHideDuration={6000}
        onClose={handleCloseSnackbar}
    >
        <Alert
            onClose={handleCloseSnackbar}
            severity={sellerProduct.error ? "error" : "success"}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {sellerProduct.error ? sellerProduct.error : "Product created successfully"}
        </Alert>
    </Snackbar>
</div>
  )
}

export default UpdateProductForm
