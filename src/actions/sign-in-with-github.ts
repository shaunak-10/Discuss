"use server";
import * as auth from "@/auth";

export async function signInWithGithub() {
  return auth.signIn("github");
}
