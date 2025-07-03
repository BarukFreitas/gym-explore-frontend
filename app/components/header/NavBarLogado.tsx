"use client";

import React, { useState } from "react";
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

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { clearCredentials } from "@/app/store/authSlice";

export interface NavBarLogadoProps {
  onLogout: () => void;
  username: string | null;
}

function NavBarLogado({ onLogout, username }: NavBarLogadoProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [openUserDrawer, setOpenUserDrawer] = useState(false);

  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch();

  const userRoles = useSelector((state: RootState) => state.auth.roles);
  const userEmail = useSelector((state: RootState) => state.auth.email);

  const showCreateGymButton = (userRoles || []).includes("ROLE_GYM_OWNER") || (userRoles || []).includes("ROLE_ADMIN");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserDrawer = () => {
    setOpenUserDrawer(true);
  };
  const handleCloseUserDrawer = () => {
    setOpenUserDrawer(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    handleCloseUserDrawer();
  };

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
          <Box
            component="img"
            src={siteLogo.src}
            alt="Gym Explore Logo"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: 40 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("logo")}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={`/${locale}/${page.path}`} passHref>
                    <Typography
                      textAlign="center"
                      sx={{
                        color:
                          pathname === `/${locale}/${page.path}`
                            ? "primary.main"
                            : "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              {showCreateGymButton && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={`/${locale}/gyms/create`} passHref>
                    <Typography
                      textAlign="center"
                      sx={{
                        color:
                          pathname === `/${locale}/gyms/create`
                            ? "primary.main"
                            : "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {t("addGym")}
                    </Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box
            component="img"
            src={siteLogo.src}
            alt="Gym Explore Logo"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, height: 30 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={`/${locale}`}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("logo")}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={`/${locale}/${page.path}`} passHref>
                  <Typography
                    textAlign="center"
                    sx={{
                      color:
                        pathname === `/${locale}/${page.path}`
                          ? "green"
                          : "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {page.name}
                  </Typography>
                </Link>
              </Button>
            ))}
            {showCreateGymButton && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={`/${locale}/gyms/create`} passHref>
                  <Typography
                    textAlign="center"
                    sx={{
                      color:
                        pathname === `/${locale}/gyms/create`
                          ? "primary.main"
                          : "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {t("addGym")}
                  </Typography>
                </Link>
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserDrawer} sx={{ p: 0 }}>
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={openUserDrawer}
        onClose={handleCloseUserDrawer}
        PaperProps={{
          sx: {
            backgroundColor: "rgb(28, 28, 28)",
            color: "white",
            width: 250,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {username && (
            <Typography variant="h6" sx={{ mb: 0.5, color: 'white' }}>
              {username}
            </Typography>
          )}
          {userEmail && (
            <Typography variant="body2" color="white" sx={{ mb: 2 }}>
              {userEmail}
            </Typography>
          )}
        </Box>
        <Divider sx={{ my: 0.5, bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
        <MenuItem onClick={handleLogoutClick} sx={{ justifyContent: 'center' }}>
          <Typography textAlign="center" sx={{ color: 'white' }}>
            {t("logoutButton")}
          </Typography>
        </MenuItem>
      </Drawer>
    </AppBar>
  );
}
export default NavBarLogado;