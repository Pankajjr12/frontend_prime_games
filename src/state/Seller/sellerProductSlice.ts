import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/productTypes";
import { api } from "../../config/Api";

const API_URL = "/sellers/product";

interface SellerProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    productCreated: boolean;
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
    productCreated: false,
};

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
    "sellerProduct/fetchSellerProducts",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get<Product[]>(API_URL, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            console.log("seller products ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response.data);
        }
    }
);

export const createProduct = createAsyncThunk<
    Product,
    { request: any; jwt: string | null }
>(
    "sellerProduct/createProduct",
    async ({ request, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post<Product>(API_URL, request, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            console.log("product created ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk<
  any,
  { productId: number; product: any }
>(
  "sellerProduct/updateProduct",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/${productId}`, product, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("product updated ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk<void, number>(
    "sellerProduct/deleteProduct",
    async (productId, { rejectWithValue }) => {
      try {
        await api.delete(`${API_URL}/${productId}`);
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.productCreated = false;
            })
            .addCase(
                fetchSellerProducts.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    state.products = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.productCreated = false;
            })
            .addCase(
                createProduct.fulfilled,
                (state, action: PayloadAction<Product>) => {
                    state.products.push(action.payload);
                    state.loading = false;
                    state.productCreated = true;
                }
            )
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create product";
                state.productCreated = false;
            })

    },
});


export default sellerProductSlice.reducer;