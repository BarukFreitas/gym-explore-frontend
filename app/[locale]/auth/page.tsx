"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

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
      data: loginData,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
      data: registerData,
    },
  ] = useRegisterUserMutation();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await loginUser({ username: loginUsername, password: loginPassword }).unwrap();
      console.log("Login bem-sucedido:", result);

      // Use a variável 'locale' que você obteve do useLocale()
      router.push(`/${locale}/gyms`);
    } catch (err: any) {
      console.error("Falha no login:", err);
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
      setIsLoginMode(true);
      alert(t('registerSuccessMessage'));
    } catch (err: any) {
      console.error("Falha no registro:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {isLoginMode ? t("loginTitle") : t("registerTitle")}
        </Typography>

        {isLoginSuccess && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {t('loginSuccessMessage')}
          </Alert>
        )}
        {isLoginError && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {(loginError as ErrorResponse)?.error || t("loginGenericErrorMessage")}
          </Alert>
        )}

        {isRegisterSuccess && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {t('registerSuccessMessage')}
          </Alert>
        )}
        {isRegisterError && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {(registerError as ErrorResponse)?.error || t("registerGenericErrorMessage")}
          </Alert>
        )}

        {isLoginMode ? (
          <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 2, width: "100%" }}>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#4CAF50", "&:hover": { bgcolor: "#45A049" } }}
              disabled={isLoginLoading}
            >
              {isLoginLoading ? <CircularProgress size={24} color="inherit" /> : t("loginButton")}
            </Button>
            <MuiLink
              component="button"
              variant="body2"
              onClick={() => setIsLoginMode(false)}
              sx={{ width: "100%", textAlign: "center", mt: 1 }}
            >
              {t("dontHaveAccount")}
            </MuiLink>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleRegisterSubmit} sx={{ mt: 2, width: "100%" }}>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#4CAF50", "&:hover": { bgcolor: "#45A049" } }}
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? <CircularProgress size={24} color="inherit" /> : t("registerButton")}
            </Button>
            <MuiLink
              component="button"
              variant="body2"
              onClick={() => setIsLoginMode(true)}
              sx={{ width: "100%", textAlign: "center", mt: 1 }}
            >
              {t("alreadyHaveAccount")}
            </MuiLink>
          </Box>
        )}
      </Box>
    </Container>
  );
}