import images from '../assets/images';
import { ROUTES } from './routes';
import { LANDING_TEXTS, SHARED_TEXTS } from './texts';
const { SOCIAL } = LANDING_TEXTS;
const {
  WHATSAPP: WHATSAPP_LINK,
  TIKTOK: TIKTOK_LINK,
  INSTAGRAM: INSTAGRAM_LINK,
} = SOCIAL;

export const MENU_ITEMS = [
  { name: SHARED_TEXTS.PLACE_ORDER, href: ROUTES.ORDER },
  { name: SHARED_TEXTS.DELIVERY, href: ROUTES.DELIVERY },
  { name: SHARED_TEXTS.ABOUT, href: ROUTES.ABOUT },
  { name: SHARED_TEXTS.SHOP, href: ROUTES.SHOP },
  { name: SHARED_TEXTS.EVENTS, href: ROUTES.EVENTS },
  { name: SHARED_TEXTS.LARGE_ORDERS, href: ROUTES.LARGE_ORDERS },
];

export const ORDER_LINKS = [
  { name: SHARED_TEXTS.LARGE_ORDERS, href: ROUTES.LARGE_ORDERS },
  { name: SHARED_TEXTS.DELIVERY, href: ROUTES.DELIVERY },
  { name: SHARED_TEXTS.SHOP, href: ROUTES.SHOP },
  { name: SHARED_TEXTS.EVENTS, href: ROUTES.EVENTS },
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
