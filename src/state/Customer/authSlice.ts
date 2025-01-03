import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { ApiResponse, AuthResponse, AuthState, LoginRequest, SignupRequest } from "../../types/authTypes";
import { RootState } from "../store";

const API_URL = '/auth';
const initialState: AuthState = {
    jwt: null,
    role: null,
    loading: false,
    error: null,
    otpSent:false
};
export const sendLoginSignupOtp = createAsyncThunk<ApiResponse, { email: string }>(
    'auth/sendLoginSignupOtp',
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/sent/login-signup-otp`, { email });
            console.log("otp sent successfully",response.data);
            return response.data;
        } catch (error:any) {
            console.log("error",error.response)
            return rejectWithValue(error.response.data.error||'Failed to send OTP');
        }
    }
);

export const signup = createAsyncThunk<AuthResponse, SignupRequest>(
    'auth/register',
    async (signupRequest, { rejectWithValue }) => {
        console.log("signup ", signupRequest)
        try {
            
            const response = await api.post<AuthResponse>(`${API_URL}/register`, signupRequest);
           signupRequest.navigate("/")
           localStorage.setItem("jwt",response.data.jwt)
            return response.data;
        } catch (error:any) {
            return rejectWithValue('Registration failed');
        }
    }
);

export const signin = createAsyncThunk<AuthResponse, LoginRequest>(
    'auth/login',
    async (loginRequest, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>(`${API_URL}/login`, loginRequest);
           console.log("login successful", response.data)
           localStorage.setItem("jwt",response.data.jwt)
           loginRequest.navigate("/");
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response)
            return rejectWithValue('Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
            state.role = null;
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendLoginSignupOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendLoginSignupOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
            })
            .addCase(sendLoginSignupOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.jwt = action.payload.jwt;
                state.role = action.payload.role;
                state.loading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(signin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signin.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.jwt = action.payload.jwt;
                state.role = action.payload.role;
                state.loading = false;
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;



export const performLogout = () => async (dispatch: any) => {
    dispatch(logout());
};

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;