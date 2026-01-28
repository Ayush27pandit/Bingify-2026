import { getAuth } from "firebase/auth";

import { auth } from "./firebase";

const TOKEN_KEY = "firebaseIdToken";

export async function getAuthHeader(): Promise<Record<string, string>> {

  const cachedToken = typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null;

  if (cachedToken) {
    return {
      Authorization: `Bearer ${cachedToken}`,
    };
  }

  //  Fallback to Firebase
  const user = auth.currentUser;

  if (!user) {
    console.warn("Firebase auth not ready and no cached token");
    return {};
  }

  const token = await user.getIdToken();

  // 3️ Cache token
  if (typeof window !== "undefined") {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

