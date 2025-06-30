"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useLoginUserMutation, useRegisterUserMutation } from "@/app/store/authApi";
import { UserRegisterRequest, UserLoginRequest, ErrorResponse } from "@/app/types/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function AuthPage() {
  const t = useTranslations("AuthPage");
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");

  const [loginUser, { isLoading: isLoginLoading, error: loginError, isSuccess: isLoginSuccess }] = useLoginUserMutation();
  const [registerUser, { isLoading: isRegisterLoading, error: registerError, isSuccess: isRegisterSuccess }] = useRegisterUserMutation();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await loginUser({ username, password } as UserLoginRequest).unwrap();
      dispatch(setCredentials({ id: result.id, username: result.username, email: result.email, roles: result.roles }));
      router.push(`/${locale}/feed`);
    } catch (err: any) {
      console.error("Failed to log in:", err);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await registerUser({ username, email, password, role } as UserRegisterRequest).unwrap();
      setIsRegisterMode(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("ROLE_USER");
    } catch (err: any) {
      console.error("Failed to register:", err);
    }
  };

  const currentError = isRegisterMode ? registerError : loginError;

  return (
    <Container component="main" maxWidth="sm" className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <Box className="flex flex-col items-center p-6 rounded-lg shadow-xl bg-white w-full">
        <Typography variant="h5" component="h1" className="mb-4 text-green-600">
          {isRegisterMode ? t("registerTitle") : t("loginTitle")}
        </Typography>

        {isLoginSuccess && !isRegisterMode && (
          <Alert severity="success" className="w-full mb-4">{t("loginSuccessMessage")}</Alert>
        )}
        {isRegisterSuccess && !isRegisterMode && (
          <Alert severity="success" className="w-full mb-4">{t("registerSuccessMessage")}</Alert>
        )}
        {currentError && (
          <Alert severity="error" className="w-full mb-4">
            {(currentError as ErrorResponse)?.error || (isRegisterMode ? t("registerGenericErrorMessage") : t("loginGenericErrorMessage"))}
          </Alert>
        )}

        <Box component="form" onSubmit={isRegisterMode ? handleRegister : handleLogin} className="w-full space-y-4">
          <TextField
            fullWidth
            label={t("usernameLabel")}
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {isRegisterMode && (
            <TextField
              fullWidth
              label={t("emailLabel")}
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <TextField
            fullWidth
            label={t("passwordLabel")}
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isRegisterMode && (
            <FormControl fullWidth variant="outlined">
              <InputLabel id="role-label">{t("selectRole")}</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as string)}
                label={t("selectRole")}
              >
                <MenuItem value="ROLE_USER">{t("roleUser")}</MenuItem>
                <MenuItem value="ROLE_GYM_OWNER">{t("roleGymOwner")}</MenuItem>
              </Select>
            </FormControl>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            disabled={isLoginLoading || isRegisterLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoginLoading || isRegisterLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isRegisterMode ? (
              t("registerButton")
            ) : (
              t("loginButton")
            )}
          </Button>
        </Box>
        <MuiLink
          component="button"
          variant="body2"
          onClick={() => setIsRegisterMode(!isRegisterMode)}
          className="text-green-600 hover:underline"
        >
          {isRegisterMode ? t("alreadyHaveAccount") : t("dontHaveAccount")}
        </MuiLink>
      </Box>
    </Container>
  );
}