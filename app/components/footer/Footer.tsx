'use client';

 import React from 'react';
 import Image from 'next/image';
 import Link from 'next/link';
 import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
 import FacebookIcon from '@mui/icons-material/Facebook';
 import TwitterIcon from '@mui/icons-material/Twitter';
 import { useTranslations } from 'next-intl';

 import gymExploreLogo from '@/public/logo.png';

 const Footer = () => {
     const t = useTranslations('Footer');
     const currentYear = new Date().getFullYear();

     const quickLinks = [
         { label: t('home'), href: '/' },
         { label: t('about'), href: '/sobre' },
         { label: t('services'), href: '/servicos' },
         { label: t('contact'), href: '/contato' },
     ];

     const legalLinks = [
         { label: t('privacyPolicy'), href: '/privacy-policy' },
         { label: t('termsOfService'), href: '/terms-of-service' },
     ];

     return (
         <footer className="bg-gray-950 text-gray-300 py-4 md:py-6">
             <div className="container mx-auto px-4 md:px-6 lg:px-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-4 border-b border-gray-700">

                     <Box className="flex flex-col items-start mb-4 md:mb-0">
                         <Link href="/" >
                             <Image
                                 src={gymExploreLogo}
                                 alt="Gym Explore Logo"
                                 width={100}
                                 height={33}
                                 className="mb-1"
                                 data-testid="footer-logo"
                             />
                         </Link>
                         <Typography variant="body2" className="text-gray-400 mb-2 text-xs" data-testid="footer-about-us-text">
                             {t('aboutUsText')}
                         </Typography>
                         <Box className="flex space-x-2">
                             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors" data-testid="footer-facebook-link">
                                 <FacebookIcon sx={{ fontSize: 18 }} />
                             </a>
                             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors" data-testid="footer-twitter-link">
                                 <TwitterIcon sx={{ fontSize: 18 }} />
                             </a>
                         </Box>
                     </Box>

                     <Box className="text-left mb-4 md:mb-0">
                         <Typography variant="h6" className="text-white font-semibold mb-2 text-sm md:text-base" data-testid="footer-quick-links-title">
                             {t('quickLinksTitle')}
                         </Typography>
                         <List disablePadding>
                             {quickLinks.map((link) => (
                                 <ListItem key={link.label} disablePadding className="mb-0">
                                     <Link
                                        href={link.href}
                                        data-testid={`footer-quick-link-${link.label.toLowerCase()}`}
                                        className="text-gray-400 hover:text-accent transition-colors cursor-pointer text-xs" // Mover className para cá
                                     >
                                         <ListItemText
                                             primary={link.label}
                                         />
                                     </Link>
                                 </ListItem>
                             ))}
                         </List>
                     </Box>

                     <Box className="text-left mb-4 md:mb-0">
                         <Typography variant="h6" className="text-white font-semibold mb-2 text-sm md:text-base" data-testid="footer-contact-us-title">
                             {t('contactUsTitle')}
                         </Typography>
                         <Typography variant="body2" className="text-gray-400 mb-0.5 text-xs" data-testid="footer-address-text">
                             {t('address')}
                         </Typography>
                         <Typography variant="body2" className="text-gray-400 mb-0.5 text-xs" data-testid="footer-phone-text">
                             {t('phone')}
                         </Typography>
                         <Typography variant="body2" className="text-gray-400 text-xs" data-testid="footer-email-text">
                             {t('email')}
                         </Typography>
                     </Box>

                     <Box className="hidden lg:block text-left mb-4 md:mb-0">
                         <Typography variant="h6" className="text-white font-semibold mb-2 text-sm md:text-base" data-testid="footer-legal-links-title">
                             {t('quickLinksTitle')}
                         </Typography>
                         <List disablePadding>
                             {legalLinks.map((link) => (
                                 <ListItem key={link.label} disablePadding className="mb-0.5">
                                     <Link
                                        href={link.href}
                                        data-testid={`footer-legal-link-${link.label.toLowerCase().replace(/ /g, '-')}`}
                                        className="text-gray-400 hover:text-accent transition-colors cursor-pointer text-xs" // Mover className para cá
                                     >
                                         <ListItemText
                                             primary={link.label}
                                         />
                                     </Link>
                                 </ListItem>
                             ))}
                         </List>
                     </Box>

                 </div>

                 <Box className="text-center pt-3">
                     <Typography variant="body2" className="text-gray-500 text-xs" data-testid="footer-copyright-text">
                         {t('allRightsReserved', { year: currentYear })}
                     </Typography>
                 </Box>
             </div>
         </footer>
     );
 };

 export default Footer;