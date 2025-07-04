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
  Container,
  Grid
} from '@mui/material';
import { useRegisterUserMutation, useLoginUserMutation } from '@/app/store/authApi';
import { UserRegisterRequest, UserLoginRequest, UserAuthResponse } from '@/app/types/auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/app/store/authSlice';
import Link from 'next/link';
import { useLocale } from 'next-intl';


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
  const locale = useLocale();

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
      dispatch(setCredentials({
        id: response.id,
        username: response.username,
        email: response.email,
        roles: response.roles,
        token: response.token,
        points: response.points
      }));
      router.push('/');
    } catch (err: any) {
      console.error('Falha no login:', err);
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
      await registerUser(registerRequest).unwrap();
      setTabValue(0);
      alert(t("registerSuccess"));
    } catch (err: any) {
      console.error('Falha no registro:', err);
    }
  };

  return (
      <Container component="main" maxWidth="xs" sx={{ mt: { xs: 16, sm: 24, md: 32 }, mb: 4, bgcolor: 'white', color: 'black', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: '8px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="auth tabs" centered sx={{ '& .MuiTabs-indicator': { backgroundColor: 'black' }, '& .MuiTab-root': { color: 'black' }, '& .Mui-selected': { color: 'black' } }}>
              <Tab label={t("loginTab")} {...a11yProps(0)} />
              <Tab label={t("registerTab")} {...a11yProps(1)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }} textAlign="center" color="black">{t("loginTitle")}</Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="loginUsername" label={t("usernameLabel")} name="username" autoComplete="username" autoFocus value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, backgroundColor: 'white' }}/>
              <TextField margin="normal" required fullWidth name="password" label={t("passwordLabel")} type="password" id="loginPassword" autoComplete="current-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, backgroundColor: 'white' }}/>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#2ECC71', '&:hover': { bgcolor: '#28a745' } }} disabled={isLoginLoading}>
                {isLoginLoading ? t("loggingIn") : t("loginButton")}
              </Button>

              <Grid container justifyContent="flex-end">
                <Link href={`/${locale}/forgot-password`} passHref>
                  <Typography
                      variant="body2"
                      sx={{
                        color: '#2ECC71',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        '&:hover': { color: '#28a745' },
                      }}
                  >
                    {t('forgotPasswordLink')}
                  </Typography>
                </Link>
              </Grid>

              {loginError && <Alert severity="error" sx={{ mt: 2 }}>{(loginError as any)?.data?.error || t("loginError")}</Alert>}
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }} textAlign="center" color="black">{t("registerTitle")}</Typography>
            <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="registerUsername" label={t("usernameLabel")} name="username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, backgroundColor: 'white' }}/>
              <TextField margin="normal" required fullWidth id="registerEmail" label={t("emailLabel")} name="email" type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, backgroundColor: 'white' }}/>
              <TextField margin="normal" required fullWidth name="password" label={t("passwordLabel")} type="password" id="registerPassword" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, backgroundColor: 'white' }}/>
              <FormControl component="fieldset" margin="normal" fullWidth sx={{ '& .MuiFormLabel-root': { color: 'black' }, '& .MuiFormControlLabel-label': { color: 'black' }, '& .MuiRadio-root': { color: 'black' }, '& .Mui-checked': { color: '#2ECC71' } }}>
                <FormLabel component="legend">{t("userTypeLabel")}</FormLabel>
                <RadioGroup row value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} sx={{ justifyContent: 'center' }}>
                  <FormControlLabel value="ROLE_USER" control={<Radio />} label={t("commonUser")} />
                  <FormControlLabel value="ROLE_GYM_OWNER" control={<Radio />} label={t("gymOwner")} />
                </RadioGroup>
              </FormControl>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#2ECC71', '&:hover': { bgcolor: '#28a745' } }} disabled={isRegisterLoading}>
                {isRegisterLoading ? t("registering") : t("registerButton")}
              </Button>
              {isRegisterSuccess && <Alert severity="success">{t("registerSuccess")}</Alert>}
              {registerError && <Alert severity="error">{(registerError as any)?.data?.error || t("registerError")}</Alert>}
            </Box>
          </CustomTabPanel>
        </Box>
      </Container>
  );
};

export default AuthPage;