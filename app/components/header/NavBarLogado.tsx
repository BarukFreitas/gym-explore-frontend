"use client";

// 1. O import do useEffect é necessário para a atualização dos pontos
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import siteLogo from "@/public/logo.png";
import Image from "next/image"; // Mantenha a importação do Image

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation"; // O usePathname é a chave para a atualização
import { useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { clearCredentials } from "@/app/store/authSlice";
import { useGetUserPointsQuery } from "@/app/store/authApi"; // Importe o hook dos pontos

// Removidas as props, pois os dados vêm do Redux
export default function NavBarLogado() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [openUserDrawer, setOpenUserDrawer] = useState(false);

    const t = useTranslations("Navbar");
    const pathname = usePathname(); // Variável que deteta a mudança de URL
    const locale = useLocale();
    const dispatch = useDispatch();

    // Obtenha os dados do utilizador, incluindo o ID, do estado do Redux
    const { id: userId, username, email, roles: userRoles } = useSelector((state: RootState) => state.auth);

    // 2. OBTENHA A FUNÇÃO 'refetch' DO HOOK
    const { data: pointsData, isLoading: isLoadingPoints, refetch } = useGetUserPointsQuery(userId!, {
        skip: !userId,
    });

    // 3. ESTE useEffect GARANTE A ATUALIZAÇÃO DOS PONTOS
    // Ele "ouve" as mudanças no 'pathname' (URL) e chama o refetch.
    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [pathname, userId, refetch]);


    const showCreateGymButton = (userRoles || []).includes("ROLE_GYM_OWNER") || (userRoles || []).includes("ROLE_ADMIN");

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleOpenUserDrawer = () => setOpenUserDrawer(true);
    const handleCloseUserDrawer = () => setOpenUserDrawer(false);

    const handleLogoutClick = () => {
        dispatch(clearCredentials());
        handleCloseUserDrawer();
    };

    // A sua lista de páginas original, mantida como estava
    const pages = [
        { name: t("home"), path: "" },
        { name: t("services"), path: "servicos" },
        { name: t("about"), path: "sobre" },
        { name: t("contact"), path: "contato" },
        { name: t("feed"), path: "feed" },
        { name: t("gyms"), path: "gyms" },
    ];

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "rgb(28, 28, 28)" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component={Image} src={siteLogo} alt="Gym Explore Logo" sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: 40, width: 'auto' }} />
                    <Typography variant="h6" noWrap component="a" href={`/${locale}`} sx={{ mr: 2, display: { xs: "none", md: "flex" }, fontFamily: "monospace", fontWeight: 700, color: "inherit", textDecoration: "none" }}>
                        {t("logo")}
                    </Typography>

                    {/* Menu Mobile, mantido como estava */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "block", md: "none" } }} >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link href={`/${locale}/${page.path}`} passHref>
                                        <Typography textAlign="center" sx={{ color: pathname === `/${locale}/${page.path}` ? "primary.main" : "inherit", textDecoration: "none" }}>
                                            {page.name}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            {showCreateGymButton && (
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link href={`/${locale}/gyms/create`} passHref>
                                        <Typography textAlign="center" sx={{ color: pathname === `/${locale}/gyms/create` ? "primary.main" : "inherit", textDecoration: "none" }}>
                                            {t("addGym")}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>

                    <Typography variant="h5" noWrap component="a" href={`/${locale}`} sx={{ mr: 2, display: { xs: "flex", md: "none" }, flexGrow: 1, fontFamily: "monospace", fontWeight: 700, color: "inherit", textDecoration: "none" }}>
                        {t("logo")}
                    </Typography>

                    {/* Menu Desktop, mantido como estava */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button key={page.name} sx={{ my: 2, color: "white", display: "block" }}>
                                <Link href={`/${locale}/${page.path}`} passHref>
                                    <Typography textAlign="center" sx={{ color: pathname === `/${locale}/${page.path}` ? "green" : "inherit", textDecoration: "none" }}>
                                        {page.name}
                                    </Typography>
                                </Link>
                            </Button>
                        ))}
                        {showCreateGymButton && (
                            <Button sx={{ my: 2, color: "white", display: "block" }}>
                                <Link href={`/${locale}/gyms/create`} passHref>
                                    <Typography textAlign="center" sx={{ color: pathname === `/${locale}/gyms/create` ? "primary.main" : "inherit", textDecoration: "none" }}>
                                        {t("addGym")}
                                    </Typography>
                                </Link>
                            </Button>
                        )}
                    </Box>

                    {/* Botão para abrir o menu lateral direito */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Abrir menu do utilizador">
                            <IconButton onClick={handleOpenUserDrawer} sx={{ p: 0 }}>
                                <MenuIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>

            {/* Drawer (Menu Lateral Direito) */}
            <Drawer anchor="right" open={openUserDrawer} onClose={handleCloseUserDrawer} PaperProps={{ sx: { backgroundColor: "rgb(28, 28, 28)", color: "white", width: 250 } }}>
                <Toolbar />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {username && <Typography variant="h6" sx={{ mb: 0.5 }}>{username}</Typography>}
                    {email && <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>{email}</Typography>}

                    {/* 4. EXIBIÇÃO DOS PONTOS NO MENU LATERAL */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255, 255, 255, 0.1)', p: '4px 12px', borderRadius: '20px', mb: 2 }}>
                        <Typography sx={{ color: '#facc15', fontSize: '1rem' }}>★</Typography>
                        <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>
                            {isLoadingPoints ? '...' : (pointsData?.points ?? 0)} Pontos
                        </Typography>
                    </Box>
                </Box>
                <Divider sx={{ my: 0.5, bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
                <MenuItem onClick={handleLogoutClick} sx={{ justifyContent: 'center' }}>
                    <Typography textAlign="center">{t("logoutButton")}</Typography>
                </MenuItem>
            </Drawer>
        </AppBar>
    );
}