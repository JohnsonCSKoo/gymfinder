import {createSlice, createAsyncThunk, AsyncThunk} from '@reduxjs/toolkit';
import {register, login, refreshToken, logout as signOut, resetPassword, deleteAccount as removeAccount} from '@/api/authApi';
import {RegisterDto, LoginDto, RefreshTokenDto, ResetPasswordDto, DeleteAccountDto} from '@/@types/auth';
import {jwtDecode} from 'jwt-decode';

interface AuthState {
    token: string | null;
    id: string | null;
    loading: boolean;
    error: string | null;
}

interface JwtPayload {
    id: string;
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

const getEmail = (): string | null => {
    if (authToken) {
        const decodedToken = jwtDecode<JwtPayload>(authToken);
        return decodedToken.id;
    }
    return null;
}

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

export const refreshUserToken = createAsyncThunk(
    'auth/refresh-token',
    async (_, { rejectWithValue }) => {
        try {
            const response = await refreshToken({ refreshToken: authToken!});
            return response.data.token;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await signOut({ token: authToken! });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/change-password',
    async (resetPasswordDto: ResetPasswordDto, { rejectWithValue }) => {
        try {
            const response = await resetPassword({...resetPasswordDto, email: getEmail()!});
            return response.data.token;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteAccount = createAsyncThunk(
    'auth/delete-account',
    async (deleteAccountDto: DeleteAccountDto, { rejectWithValue }) => {
        try {
            await removeAccount({...deleteAccountDto, token: authToken!});
            return true;
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
            logoutUser();
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
            })
            .addCase(refreshUserToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshUserToken.fulfilled, (state, action) => {
                sessionStorage.removeItem('jwt');
                sessionStorage.setItem('jwt', action.payload);
                state.token = action.payload;
                state.id = getId();
            })
            .addCase(refreshUserToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                sessionStorage.removeItem('jwt');
                sessionStorage.setItem('jwt', action.payload);
                state.token = action.payload;
                state.id = getId();
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                sessionStorage.removeItem('jwt');
                state.token = null;
                state.id = null;
            })
            .addCase(deleteAccount.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

