import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import sessionManager from '../../utils/sessionManager';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(username, password);
      if (response.success) {
        sessionManager.setSession(response.token, response.user);
        return response;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: sessionManager.getSession().user,
    token: sessionManager.getSession().token,
    isAuthenticated: sessionManager.isSessionValid(),
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      sessionManager.clearSession();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;