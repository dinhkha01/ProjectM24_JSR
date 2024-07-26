import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "..";
import { users } from "../../config/interface";

<<<<<<< HEAD
export const login: any = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("users");
      const users = response.data;
      const user = users.find((u: users) => u.email === credentials.email);
=======
// Auth API functions
export const registerApi = async (user: users) => {
  const res = await api.post("register", user);
  return res.data;
};
>>>>>>> db1f99ed07afb21d6ea7de965efeda393e96be24

export const loginApi = async (data: { email: string; password: string }) => {
  const res = await api.post("login", data);
  return res.data;
};

// Async thunks
export const registerUser :any = createAsyncThunk(
  'user/register',
  async (data: users, { rejectWithValue }) => {
    try {
      const response = await registerApi(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

<<<<<<< HEAD
export const createAccount: any = createAsyncThunk(
  "user/createAccount",
  async (data: {}) => {
    const res = await api.post("users", data);
    return res.data;
=======
export const login: any = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      localStorage.setItem('token', response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
>>>>>>> db1f99ed07afb21d6ea7de965efeda393e96be24
  }
);

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [] as users[],
    isLoading: false,
    error: null as string | null,
    currentUser: null as users | null,

  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
   
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
=======
      
      .addCase(registerUser.fulfilled, (state, action) => {
       
        state.currentUser = action.payload.user;
      
        localStorage.setItem('token', action.payload.accessToken);
      })
      
     
>>>>>>> db1f99ed07afb21d6ea7de965efeda393e96be24
      .addCase(login.fulfilled, (state, action) => {
       
        state.currentUser = action.payload.user;
        
        localStorage.setItem('token', action.payload.accessToken);
      })
      
  },
});

export const { logout } = authSlice.actions;
export const reducer = authSlice.reducer;
