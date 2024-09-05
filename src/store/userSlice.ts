import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../types";

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return (await response.json()) as User[];
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        field: keyof UserState["filters"];
        value: string;
      }>
    ) => {
      state.filters[action.payload.field] = action.payload.value;
      state.filteredUsers = state.users.filter((user) => {
        return (
          user.name
            .toLowerCase()
            .includes(state.filters.name.trim().toLowerCase()) &&
          user.username
            .toLowerCase()
            .includes(state.filters.username.trim().toLowerCase()) &&
          user.email
            .toLowerCase()
            .includes(state.filters.email.trim().toLowerCase()) &&
          user.phone
            .toLowerCase()
            .includes(state.filters.phone.trim().toLowerCase())
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      });
  },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
