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
import AdbIcon from "@mui/icons-material/Adb";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { clearCredentials } from "@/app/store/authSlice";

// Interface para as props do NavBarLogado AGORA EXPORTADA
export interface NavBarLogadoProps {
  onLogout: () => void;
  username: string | null;
}

function NavBarLogado({ onLogout, username }: NavBarLogadoProps) {
  const t = useTranslations("Navbar");
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch();

  const userRoles = useSelector((state: RootState) => state.auth.roles);
  // Adicione uma verificação de segurança para userRoles ser sempre um array
  const showCreateGymButton = (userRoles || []).includes("ROLE_GYM_OWNER") || (userRoles || []).includes("ROLE_ADMIN");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    onLogout();
    handleCloseUserMenu();
  };

  const pages = [
    { name: t("home"), path: "" },
    { name: t("services"), path: "servicos" },
    { name: t("about"), path: "sobre" },
    { name: t("contact"), path: "contato" },
    { name: t("feed"), path: "feed" },
    { name: t("gyms"), path: "gyms" },
  ];
  const settings = [{ name: t("logoutButton"), action: handleLogoutClick }];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "rgb(28, 28, 28)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={`/${locale}`}
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
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
                          ? "green"
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
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AdbIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.action}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBarLogado;