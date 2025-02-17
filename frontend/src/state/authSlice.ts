import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '@/api/authApi';
import { RegisterDto, LoginDto } from '@/@types/auth';

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const authToken: string | null = sessionStorage.getItem('jwt');

const initialState: AuthState = {
    token: authToken,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (registerDto: RegisterDto, { rejectWithValue }) => {
        try {
            const response = await register(registerDto);
            return response.data.token;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (loginDto: LoginDto, { rejectWithValue }) => {
        try {
            const response = await login(loginDto);
            return response.data.token;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            sessionStorage.removeItem('jwt');
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                sessionStorage.setItem('jwt', action.payload);
                state.token = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                sessionStorage.setItem('jwt', action.payload);
                state.token = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

