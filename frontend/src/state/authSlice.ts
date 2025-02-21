import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '@/api/authApi';
import { RegisterDto, LoginDto } from '@/@types/auth';
import {jwtDecode} from 'jwt-decode';

interface AuthState {
    token: string | null;
    id: string | null;
    loading: boolean;
    error: string | null;
}

interface JwtPayload {
    userId: string;
    exp: number;
}

const authToken: string | null = sessionStorage.getItem('jwt');

const getId = (): string | null => {
    if (authToken) {
        const decodedToken = jwtDecode<JwtPayload>(authToken);
        return decodedToken.userId;
    }
    return null;
};

const initialState: AuthState = {
    token: authToken,
    id: getId(),
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
            sessionStorage.removeItem('id');
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
                state.id = getId();
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
                state.id = getId();
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

