import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Box,
  FormHelperText,
} from "@mui/material";

import { HomeCategory } from "../../../types/homeDataTypes";
import { pcLevelTwo } from "../../../data/pc/levelTwoPc";
import { psLevelTwo } from "../../../data/ps/levelTwoPs";
import { trendingLevelTwo } from "../../../data/trending/levelTwoTrending";
import { deviceTwo } from "../../../data/appliances/deviceLlevelTwo";
import { pcLevelThree } from "../../../data/pc/levelThreePc";
import { psLevelThree } from "../../../data/ps/levelThreePs";
import { trendLevelThree } from "../../../data/trending/levelThreeTrending";
import { deviceThree } from "../../../data/appliances/deviceLevelThree";
import { useAppDispatch } from "../../../state/store";
import { updateHomeCategory } from "../../../state/Admin/adminSlice";
import { mainCategory } from "../../../data/mainCategory";

// Define validation schema using Yup
const validationSchema = Yup.object({
  image: Yup.string().required("Image is required"),
  category: Yup.string().required("Category is required"),
});

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

const UpdateHomeCategoryForm = ({
  category,
  handleClose,
}: {
  category: HomeCategory | undefined;
  handleClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      image: "",
      category: "",
      category2: "",
      category3: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // const data =
      console.log("Form Data:", values, category);
      if (category?.id) {
        dispatch(
          updateHomeCategory({
            id: category.id,
            data: { image: values.image, categoryId: values.category3 },
          })
        );
      }
      handleClose()
    },
  });

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      // console.log("Category", parentCategoryId, child)
      return child.parentCategoryId == parentCategoryId;
    });
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, margin: "auto", padding: 3 }}
      className="space-y-6"
    >
      <Typography variant="h4" gutterBottom>
        Update Category
      </Typography>

      {/* Image Field */}
      <TextField
        fullWidth
        id="image"
        name="image"
        label="Image URL"
        value={formik.values.image}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />

      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category-label">Category2</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          label="Category2"
        >
          {/* <MenuItem value=""><em>None</em></MenuItem> */}
          {mainCategory.map((item) => (
            <MenuItem value={item.categoryId}>{item.name}</MenuItem>
          ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category2-label">Second Category</InputLabel>
        <Select
          labelId="category2-label"
          id="category2"
          name="category2"
          value={formik.values.category2}
          onChange={formik.handleChange}
          label="Second Category"
        >
          {formik.values.category &&
            categoryTwo[formik.values.category]?.map((item) => (
              <MenuItem value={item.categoryId}>{item.name}</MenuItem>
            ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>
      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category-label">Third Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category3"
          value={formik.values.category3}
          onChange={formik.handleChange}
          label="Third Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {formik.values.category2 &&
            childCategory(
              categoryThree[formik.values.category],
              formik.values.category2
            )?.map((item: any) => (
              <MenuItem value={item.categoryId}>{item.name}</MenuItem>
            ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>

      {/* Submit Button */}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        sx={{ py: ".9rem" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UpdateHomeCategoryForm;