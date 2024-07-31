import { getAllPost } from "./Post";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, auth } from "..";
import { users } from "../../config/interface";

// Auth API functions
export const registerApi = async (user: users) => {
  const res = await api.post("register", user);
  return res.data;
};

export const loginApi = async (data: { email: string; password: string }) => {
  const res = await api.post("login", data);
  return res.data;
};

// Async thunks
export const registerUser: any = createAsyncThunk(
  "user/register",
  async (data: users, { rejectWithValue }) => {
    try {
      const response = await registerApi(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login: any = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginApi(credentials);
      console.log("API response:", response);
      localStorage.setItem("token", response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllUsers: any = createAsyncThunk(
  "user/getAllUsers",
  async () => {
    const res = await api.get("users");
    return res.data;
  }
);

export const autoLogin: any = createAsyncThunk("user/autoLogin", async () => {
  const userId = localStorage.getItem("userId");
  const res = await auth.get("/660/users/" + userId);
  return res.data;
});
export const avatar: any = createAsyncThunk(
  "user/avatar",
  async (avatar: string) => {
    const idUser = localStorage.getItem("userId");

    const res = await api.patch("users/" + idUser, { avatar });
    return res.data;
  }
);
// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [] as users[],
    isLoading: false,
    error: null as string | null,
    currentUser: {} as users | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;

        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;

        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("userId", action.payload.user.id);
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.currentUser = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          role: action.payload.role,
          avatar: action.payload.avatar,
          password: "",
        };
      })
      .addCase(avatar.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.avatar = action.payload.avatar;
        }
      });
  },
});

export const reducer = authSlice.reducer;
