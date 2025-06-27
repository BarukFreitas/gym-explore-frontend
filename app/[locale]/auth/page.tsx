"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useDispatch } from "react-redux";

import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Link as MuiLink,
} from "@mui/material";

import { useLoginUserMutation, useRegisterUserMutation } from "@/app/store/authApi";
import { setCredentials } from "@/app/store/authSlice";
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserAuthResponse,
  ErrorResponse,
} from "@/app/types/auth";

export default function AuthPage() {
  const t = useTranslations("AuthPage");
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [
    loginUser,
    {
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const mutationResult = loginUser({ username: loginUsername, password: loginPassword });
      console.log("Resultado da Mutação (antes de unwrap):", mutationResult);

      const result = await mutationResult.unwrap();
      console.log("Login bem-sucedido:", result);

      dispatch(setCredentials({ id: result.id, username: result.username, email: result.email }));

      router.push(`/${locale}/gyms`);
    } catch (err: any) {
      console.error("Falha no login (erro detalhado):", err);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await registerUser({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }).unwrap();
      console.log("Registro bem-sucedido:", result);

      dispatch(setCredentials({ id: result.id, username: result.username, email: result.email }));

      setIsLoginMode(true);
      alert(t('registerSuccessMessage'));
      router.push(`/${locale}/gyms`);
    } catch (err: any) {
      console.error("Falha no registro:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <Box
        className="flex flex-col items-center p-8 rounded-lg shadow-xl bg-white max-w-sm w-full">
        <Typography variant="h4" component="h1" gutterBottom className="mb-4 text-center">
          {isLoginMode ? t("loginTitle") : t("registerTitle")}
        </Typography>

        {isLoginSuccess && (
          <Alert severity="success" className="w-full mb-4">
            {t('loginSuccessMessage')}
          </Alert>
        )}
        {isLoginError && (
          <Alert severity="error" className="w-full mb-4">
            {(loginError as ErrorResponse)?.error || t("loginGenericErrorMessage")}
          </Alert>
        )}

        {isRegisterSuccess && (
          <Alert severity="success" className="w-full mb-4">
            {t('registerSuccessMessage')}
          </Alert>
        )}
        {isRegisterError && (
          <Alert severity="error" className="w-full mb-4">
            {(registerError as ErrorResponse)?.error || t("registerGenericErrorMessage")}
          </Alert>
        )}

        {isLoginMode ? (
          <Box component="form" onSubmit={handleLoginSubmit} className="mt-4 w-full">
            <TextField
              margin="normal"
              required
              fullWidth
              id="usernameLogin"
              label={t("usernameLabel")}
              name="username"
              autoComplete="username"
              autoFocus
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              className="mb-4"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("passwordLabel")}
              type="password"
              id="passwordLogin"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="mb-4"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-6 mb-4 bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? <CircularProgress size={24} color="inherit" /> : t("loginButton")}
            </Button>
            <MuiLink
              component="button"
              variant="body2"
              onClick={() => setIsLoginMode(false)}
              className="w-full text-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {t("dontHaveAccount")}
            </MuiLink>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleRegisterSubmit} className="mt-4 w-full">
            <TextField
              margin="normal"
              required
              fullWidth
              id="usernameRegister"
              label={t("usernameLabel")}
              name="username"
              autoComplete="username"
              autoFocus
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              className="mb-4"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="emailRegister"
              label={t("emailLabel")}
              name="email"
              autoComplete="email"
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="mb-4"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("passwordLabel")}
              type="password"
              id="passwordRegister"
              autoComplete="new-password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="mb-4"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-6 mb-4 bg-green-600 hover:bg-green-700 text-white"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? <CircularProgress size={24} color="inherit" /> : t("registerButton")}
            </Button>
            <MuiLink
              component="button"
              variant="body2"
              onClick={() => setIsLoginMode(true)}
              className="w-full text-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {t("alreadyHaveAccount")}
            </MuiLink>
          </Box>
        )}
      </Box>
    </div>
  );
}