import { authClient } from "@/app/lib/auth-client";

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data } = await authClient.token();
  const token = data?.token;

  if (!token) {
    throw new Error("Please log in first.");
  }

  return { Authorization: "Bearer " + token };
}