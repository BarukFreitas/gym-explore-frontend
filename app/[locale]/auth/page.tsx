"use client";

import React, { useState, SyntheticEvent } from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Alert,
  Typography,
  Tabs,
  Tab,
  Container
} from '@mui/material';
import { useRegisterUserMutation, useLoginUserMutation } from '@/app/store/authApi';
import { UserRegisterRequest, UserLoginRequest, UserAuthResponse, ErrorResponse } from '@/app/types/auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/app/store/authSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AuthPage = () => {
  const t = useTranslations("AuthPage");
  const router = useRouter();
  const dispatch = useDispatch();

  const [tabValue, setTabValue] = useState(0);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginUserMutation();

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('ROLE_USER');
  const [registerUser, { isLoading: isRegisterLoading, error: registerError, isSuccess: isRegisterSuccess }] = useRegisterUserMutation();

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginRequest: UserLoginRequest = {
      username: loginUsername,
      password: loginPassword,
    };
    try {
      const response: UserAuthResponse = await loginUser(loginRequest).unwrap();
      console.log("Roles recebidas do backend (LOGIN):", response.roles);
      dispatch(setCredentials({
        id: response.id,
        username: response.username,
        email: response.email,
        roles: response.roles,
      }));
      router.push('/');
    } catch (err: any) {
      console.error('Falha no login:', err);
      // Detalhes do erro do backend (melhorado para depuração)
      if (err.status && err.data) {
        console.error('Detalhes do erro do backend:', err.data);
      }
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const registerRequest: UserRegisterRequest = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
      role: selectedRole,
    };
    try {
      const response: UserAuthResponse = await registerUser(registerRequest).unwrap();
      console.log("Roles recebidas do backend (REGISTRO):", response.roles);
      setTabValue(0);
      alert(t("registerSuccess"));
    } catch (err: any) {
      console.error('Falha no registro:', err);
      if (err.status && err.data) {
        console.error('Detalhes do erro do backend:', err.data);
      }
    }
  };

  return (
    // CORREÇÃO APLICADA AQUI: Fundo branco e texto preto para o Container principal
    <Container component="main" maxWidth="xs" sx={{ mt: 32, mb: 4, bgcolor: 'white', color: 'black', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      {/* Adicionado Box para o conteúdo do formulário para ter um fundo branco consistente */}
      <Box sx={{ bgcolor: 'white', p: 3, borderRadius: '8px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="auth tabs" centered
            // CORREÇÃO APLICADA AQUI: Cores das abas para tema claro
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: 'black' }, // Indicador preto
              '& .MuiTab-root': { color: 'black' }, // Texto da aba inativa preto
              '& .Mui-selected': { color: 'black' }, // Texto da aba selecionada preto
            }}
          >
            <Tab label={t("loginTab")} {...a11yProps(0)} />
            <Tab label={t("registerTab")} {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={tabValue} index={0}>
          {/* CORREÇÃO APLICADA AQUI: Cor da Typography para tema claro */}
          <Typography component="h1" variant="h5" sx={{ mb: 3 }} textAlign="center" color="black">
            {t("loginTitle")}
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            {/* CORREÇÃO APLICADA AQUI: Cores do TextField para tema claro */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="loginUsername"
              label={t("usernameLabel")}
              name="username"
              autoComplete="username"
              autoFocus
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              InputLabelProps={{ style: { color: 'black' } }} // Cor do label
              InputProps={{ style: { color: 'black' } }} // Cor do texto digitado
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' }, // Borda padrão
                  '&:hover fieldset': { borderColor: 'black' }, // Borda ao passar o mouse
                  '&.Mui-focused fieldset': { borderColor: 'black' }, // Borda ao focar
                },
                backgroundColor: 'white', // Fundo do input branco
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("passwordLabel")}
              type="password"
              id="loginPassword"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              InputLabelProps={{ style: { color: 'black' } }} // Cor do label
              InputProps={{ style: { color: 'black' } }} // Cor do texto digitado
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                },
                backgroundColor: 'white',
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#2ECC71', '&:hover': { bgcolor: '#28a745' } }} // Cor do botão verde original
              disabled={isLoginLoading}
            >
              {isLoginLoading ? t("loggingIn") : t("loginButton")}
            </Button>
            {loginError && (
              <Alert severity="error">
                {(loginError as any)?.data?.error || t("loginError")}
              </Alert>
            )}
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          {/* CORREÇÃO APLICADA AQUI: Cor da Typography para tema claro */}
          <Typography component="h1" variant="h5" sx={{ mb: 3 }} textAlign="center" color="black">
            {t("registerTitle")}
          </Typography>
          <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
            {/* CORREÇÃO APLICADA AQUI: Cores do TextField para tema claro */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="registerUsername"
              label={t("usernameLabel")}
              name="username"
              autoComplete="new-username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                },
                backgroundColor: 'white',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="registerEmail"
              label={t("emailLabel")}
              name="email"
              autoComplete="email"
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                },
                backgroundColor: 'white',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("passwordLabel")}
              type="password"
              id="registerPassword"
              autoComplete="new-password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                },
                backgroundColor: 'white',
              }}
            />

            <FormControl component="fieldset" margin="normal" fullWidth
              // CORREÇÃO APLICADA AQUI: Cores do FormControl e RadioGroup para tema claro
              sx={{
                '& .MuiFormLabel-root': { color: 'black' }, // Label do FormControl
                '& .MuiFormControlLabel-label': { color: 'black' }, // Labels dos Radio
                '& .MuiRadio-root': { color: 'black' }, // Ícone do Radio (desmarcado)
                '& .Mui-checked': { color: '#2ECC71' }, // Ícone do Radio (marcado)
              }}
            >
              <FormLabel component="legend">{t("userTypeLabel")}</FormLabel>
              <RadioGroup
                row
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
                sx={{ justifyContent: 'center' }}
              >
                <FormControlLabel value="ROLE_USER" control={<Radio />} label={t("commonUser")} />
                <FormControlLabel value="ROLE_GYM_OWNER" control={<Radio />} label={t("gymOwner")} />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#2ECC71', '&:hover': { bgcolor: '#28a745' } }}
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? t("registering") : t("registerButton")}
            </Button>

            {isRegisterSuccess && <Alert severity="success">{t("registerSuccess")}</Alert>}
            {registerError && (
              <Alert severity="error">
                {(registerError as any)?.data?.error || t("registerError")}
              </Alert>
            )}
          </Box>
        </CustomTabPanel>
      </Box> {/* Fim do Box com fundo branco */}
    </Container>
  );
};

export default AuthPage;