import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "..";
import { users } from "../../config/interface";

export const login : any = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("users");
      const users = response.data;
      const user = users.find((u: users) => u.email === credentials.email);

      if (user && user.password === credentials.password) {
        return user;
      } else {
        return rejectWithValue("Email hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi đăng nhập");
    }
  }
);


export const createAccount: any = createAsyncThunk(
  "user/createAccount",
  async (data: {}) => {
    const res = await api.post("users", data);
    return res.data;
  }
);
export const getAllUser: any = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await api.get("users");
    return response.data;
  }
);

export const user = createSlice({
  name: "user",
  initialState: {
    user: [] as users[],
    isLoading: false,
    error: null,
    currentUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.user = [...state.user, action.payload];
      });
  },
});

export const { reducer } = user;
