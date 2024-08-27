import "server-only";

import { clientAuth } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

interface AuthResponse {
  result: UserCredential | null;
  error: unknown;
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  try {
    const result: UserCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
    return { result: result, error: null };
  } catch (e) {
    return { result: null, error: e };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const result: UserCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    return { result: result, error: null };
  } catch (e) {
    return { result: null, error: e };
  }
}
