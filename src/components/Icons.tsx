/**
 * Icon set: Lucide (UI icons, current 1.x) + Font Awesome 6 brand glyphs via react-icons (Instagram, Facebook, WhatsApp).
 * Every icon is decorative (aria-hidden); size comes from the className (h-* w-*), default 20px.
 */
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseMedical,
  Building2,
  CalendarDays,
  Check,
  ClipboardList,
  Clock3,
  Compass,
  Copy,
  Cross,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Navigation,
  Phone,
  ScrollText,
  Stethoscope,
  X,
  type LucideIcon,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

type P = { className?: string };

const lucide =
  (Icon: LucideIcon) =>
  function WrappedIcon({ className }: P) {
    return <Icon className={className} size={20} strokeWidth={1.9} aria-hidden="true" />;
  };

export const PhoneIcon = lucide(Phone);
export const MailIcon = lucide(Mail);
export const PinIcon = lucide(MapPin);
export const DirectionsIcon = lucide(Navigation);
export const StethoscopeIcon = lucide(Stethoscope);
export const ChatIcon = lucide(MessageSquareText);
export const CompassIcon = lucide(Compass);
export const ClipboardIcon = lucide(ClipboardList);
export const CapIcon = lucide(GraduationCap);
export const BuildingIcon = lucide(Landmark);
export const ClockIcon = lucide(Clock3);
export const CalendarIcon = lucide(CalendarDays);
export const ScrollIcon = lucide(ScrollText);
export const MedicalCrossIcon = lucide(Cross);
export const CopyIcon = lucide(Copy);
export const CheckIcon = lucide(Check);
export const MenuIcon = lucide(Menu);
export const CloseIcon = lucide(X);
export const ArrowRightIcon = lucide(ArrowRight);
export const ClinicsIcon = lucide(Building2);
export const VerifiedIcon = lucide(BadgeCheck);
export const ExperienceIcon = lucide(BriefcaseMedical);

/** Brand glyphs (Font Awesome 6): filled, 1em by default. */
export const WhatsAppIcon = ({ className }: P) => <FaWhatsapp className={className} size={20} aria-hidden="true" />;
export const InstagramIcon = ({ className }: P) => <FaInstagram className={className} size={20} aria-hidden="true" />;
export const FacebookIcon = ({ className }: P) => <FaFacebookF className={className} size={20} aria-hidden="true" />;
