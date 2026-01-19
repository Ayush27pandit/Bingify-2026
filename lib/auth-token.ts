import { getAuth } from "firebase/auth";

export async function getAuthHeader(): Promise<{ Authorization: string }> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user found");
  }
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}
