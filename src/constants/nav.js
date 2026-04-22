import images from '../assets/images';
import { ROUTES } from './routes';
import { WHATSAPP_LINK, TIKTOK_LINK, INSTAGRAM_LINK } from './strings';

export const MENU_ITEMS = [
  { name: 'HACER PADIDO', href: ROUTES.ORDER },
  { name: 'DELIVERY', href: ROUTES.DELIVERY },
  { name: 'SOBRE PAPUT', href: ROUTES.ABOUT },
  { name: 'TIENDA', href: ROUTES.SHOP },
  { name: 'EVENTOS', href: ROUTES.EVENTS },
  { name: 'PEDIDOS GRANDES', href: ROUTES.LARGE_ORDERS },
];

export const ORDER_LINKS = [
  { name: 'PEDIDOS GRANDES', href: ROUTES.LARGE_ORDERS },
  { name: 'DELIVERY', href: ROUTES.DELIVERY },
  { name: 'TIENDA', href: ROUTES.SHOP },
  { name: 'EVENTOS', href: ROUTES.EVENTS },
];

export const NAV_SOCIAL_ICONS = [
  {
    default: images.instaNav,
    hover: images.instaNavR,
    alt: 'instaNav',
    href: INSTAGRAM_LINK,
  },
  {
    default: images.wpNav,
    hover: images.wpNavR,
    alt: 'wpNav',
    href: WHATSAPP_LINK,
  },
  {
    default: images.bikeNav,
    hover: images.bikeNavR,
    alt: 'bikeNav',
    href: ROUTES.DELIVERY,
  },
  {
    default: images.musNav,
    hover: images.musNavR,
    alt: 'musNav',
    href: TIKTOK_LINK,
  },
];

export const FOOTER_SOCIAL_ICONS = [
  {
    default: images.instaFooter,
    hover: images.instaFooterY,
    alt: 'Instagram',
    href: INSTAGRAM_LINK,
  },
  {
    default: images.wpFooter,
    hover: images.wpFooterY,
    alt: 'WhatsApp',
    href: WHATSAPP_LINK,
  },
  {
    default: images.vehicleFooter,
    hover: images.bikeFooterY,
    alt: 'Delivery',
    href: ROUTES.DELIVERY,
  },
  {
    default: images.musFooter,
    hover: images.musFooterY,
    alt: 'TikTok',
    href: TIKTOK_LINK,
  },
];
