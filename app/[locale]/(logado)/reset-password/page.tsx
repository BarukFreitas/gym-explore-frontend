"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResetPasswordMutation } from '@/app/store/authApi';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';
import Link from 'next/link';
import { useLocale } from 'next-intl';

function ResetPasswordComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const locale = useLocale();

    const [token, setToken] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation();

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setMessage("Token de redefinição inválido ou ausente.");
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        if (newPassword !== confirmPassword) {
            setMessage("As senhas não coincidem.");
            return;
        }
        if (!token) {
            setMessage("Token de redefinição não encontrado.");
            return;
        }

        try {
            await resetPassword({ token, newPassword }).unwrap();
        } catch (err: any) {
            setMessage(err.data?.error || "Ocorreu um erro ao redefinir a senha.");
        }
    };

    if (isSuccess) {
        return (
            <Box sx={{ textAlign: 'center' }}>
                <Alert severity="success" sx={{ width: '100%', mt: 3 }}>
                    Senha redefinida com sucesso!
                </Alert>
                <Link href={`/${locale}/auth`} passHref>
                    <Button
                        variant="contained"
                        // >>> A CORREÇÃO ESTÁ AQUI <<<
                        sx={{ mt: 2, bgcolor: '#2ECC71', '&:hover': { bgcolor: '#28a745' } }}
                    >
                        Ir para o Login
                    </Button>
                </Link>
            </Box>
        );
    }

    if (!token && !message) {
        return <Typography>A verificar o link...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">Redefinir a sua Senha</Typography>

            {message && <Alert severity={isError ? "error" : "info"} sx={{ width: '100%', mt: 2 }}>{message}</Alert>}

            {token && (
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="Nova Senha"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar Nova Senha"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: '#2ECC71', '&:hover': { bgcolor: '#28a745' } }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'A Redefinir...' : 'Redefinir Senha'}
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<Typography>A carregar...</Typography>}>
            <Container component="main" maxWidth="xs" sx={{ mt: 16 }}>
                <ResetPasswordComponent />
            </Container>
        </Suspense>
    );
}