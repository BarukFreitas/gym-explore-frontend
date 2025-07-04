"use client";

import React, { useState } from 'react';
import { useForgotPasswordMutation } from '@/app/store/authApi';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [forgotPassword, { isLoading, isSuccess, isError }] = useForgotPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await forgotPassword({ email });
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 16 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Esqueceu a Senha?</Typography>
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Insira o seu e-mail e enviaremos um link para redefinir a sua senha.
                </Typography>

                {isSuccess ? (
                    <Alert severity="success" sx={{ width: '100%', mt: 3 }}>
                        Se um e-mail correspondente for encontrado na nossa base de dados, um link de redefinição foi enviado.
                    </Alert>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Endereço de E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {isError && (
                            <Alert severity="error" sx={{ width: '100%', mt: 1 }}>
                                Ocorreu um erro. Por favor, tente novamente.
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#2ECC71', '&:hover': { bgcolor: '#28a745' } }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'A Enviar...' : 'Enviar Link de Redefinição'}
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
}