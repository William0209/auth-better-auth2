"use server";
// Server actions for authentication

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const signUp = async (email: string, password: string, name: string) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      callbackURL: "/dashboard",
    },
    headers: await headers(),
  });

  if (result?.user) {
    // Perform a server-side redirect so the browser navigates immediately
    redirect("/dashboard");
  }
  return result;
};

export const signIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/dashboard",
    },
    headers: await headers(),
  });

  if (result?.user) {
    // Perform a server-side redirect so the browser navigates immediately
    redirect("/dashboard");
  }
  return result;
};

export const signOut = async () => {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  return result;
};

export const signInSocial = async (provider: "google" | "github") => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/dashboard",
    },
    headers: await headers(),
  });
  if (url) {
    redirect(url);
  }
};
