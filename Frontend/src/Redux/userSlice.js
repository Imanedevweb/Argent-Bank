import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Définir l'URL de l'API
const API_URL = "http://localhost:3001/api/v1";

// Actions asynchrones
export const getUser = createAsyncThunk("user/getProfile", async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Erreur de récupération du profil");
  }
});

export const loginUser = createAsyncThunk("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    if (credentials.rememberMe) {
      localStorage.setItem("email", credentials.email);
      localStorage.setItem("password", credentials.password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Erreur de connexion");
  }
});

export const editUserProfile = createAsyncThunk(
  "user/editProfile",
   async (user, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const token = state.user.token || localStorage.getItem('token'); // Récupérer le token depuis Redux ou localStorage
        const response = await axios.put(`${API_URL}/user/profile`, user, {
            headers: {
              Authorization: `Bearer ${token}`,  // Envoyer le token dans les en-têtes
            },
        });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur de mise à jour du profil");
    }
  }
);

// État initial
const initialState = {
  profile: { userName: "", firstName: "", lastName: "", email: "" },
  token: "",
  isAuthenticated: false,
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

// Slice utilisateur
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    logoutUser(state) {
      state.profile = { userName: "", firstName: "", lastName: "", email: "" };
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    clearForm(state) {
      state.profile = { ...initialState.profile };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.profile = action.payload.body || initialState.profile;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.body.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.body.token);
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.profile.userName = action.payload.body.userName;
        state.status = "succeeded";
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Actions exportées
export const { setToken, logoutUser, clearForm } = userSlice.actions;

// Exporter le reducer
export default userSlice.reducer;
