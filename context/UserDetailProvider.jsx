import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from backend
  const fetchUserProfile = async (token) => {
    try {
      console.log(
        "[UserDetailProvider] Fetching user profile with token:",
        token
      );
      const res = await axios.get(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let userData = res.data;
      console.log("[UserDetailProvider] Backend user response:", userData);
      // Ensure userData has an 'id' field
      if (!userData.id && userData._id) {
        userData.id = userData._id;
      }
      // Also set window/global for debugging (optional, remove in prod)
      if (typeof window !== "undefined") {
        window.currentUserId = userData.id;
      }
      globalThis.currentUserId = userData.id;
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData)); // persist user
      console.log("[UserDetailProvider] Saved user to AsyncStorage:", userData);
    } catch (err) {
      setUser(null);
      await AsyncStorage.removeItem("user");
      console.error("[UserDetailProvider] Failed to fetch user profile:", err);
    }
  };

  // On mount, check for token and fetch user
  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");
        console.log("[UserDetailProvider] Loaded from AsyncStorage:", {
          storedUser,
          token,
        });
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
          // Try to refresh user profile, but don't clear user if it fails
          try {
            await fetchUserProfile(token);
          } catch (err) {
            console.warn(
              "Failed to refresh user profile, using cached user.",
              err
            );
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error initializing user from AsyncStorage", err);
        setUser(null);
      }
      setLoading(false);
    };
    initializeUser();
  }, []);

  // Save user info to AsyncStorage whenever it changes
  useEffect(() => {
    const persistUser = async () => {
      if (user) {
        try {
          await AsyncStorage.setItem("user", JSON.stringify(user));
          // Also set window/global for debugging (optional, remove in prod)
          if (typeof window !== "undefined") {
            window.currentUserId = user.id;
          }
          globalThis.currentUserId = user.id;
        } catch (e) {
          console.error("Failed to save user to AsyncStorage", e);
        }
      }
    };
    persistUser();
  }, [user]);

  // Login: save token and user
  const login = async (userObj, token) => {
    // Ensure userObj has an 'id' field everywhere
    let userToSave = { ...userObj };
    if (!userToSave.id && userToSave._id) {
      userToSave.id = userToSave._id;
    }
    // Also set window/global for debugging (optional, remove in prod)
    if (typeof window !== "undefined") {
      window.currentUserId = userToSave.id;
    }
    globalThis.currentUserId = userToSave.id;
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(userToSave));
    setUser(userToSave);
  };

  // Logout: clear token and user
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserDetailContext.Provider
      value={{ user, setUser, login, logout, loading }}
    >
      {children}
    </UserDetailContext.Provider>
  );
};

export const useUser = () => useContext(UserDetailContext);
