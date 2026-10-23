type P = { className?: string };
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const PhoneIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);
export const WhatsAppIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5Z" /></svg>
);
export const MailIcon = ({ className }: P) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const PinIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const StethoscopeIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></svg>
);
export const ChatIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M4 5h16v11H9l-5 4V5Z" /></svg>
);
export const CompassIcon = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></svg>
);
export const ClipboardIcon = ({ className }: P) => (
  <svg {...base} className={className}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9zM9 12h6M9 16h4" /></svg>
);
export const CapIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.500 6-3v-4.500" /></svg>
);
export const BuildingIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M3 21h18M5 21V10m14 11V10M3 10l9-6 9 6M9 21v-6h6v6" /></svg>
);
export const ClockIcon = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const CalendarIcon = ({ className }: P) => (
  <svg {...base} className={className}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 10h16M8 3v4m8-4v4" /></svg>
);
export const ScrollIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M8 4h11v13a3 3 0 0 1-3 3H6a3 3 0 0 0 3-3V4Z" /><path d="M8 4a2 2 0 0 0-2 2v1h3M12 9h4m-4 4h4" /></svg>
);
export const InstagramIcon = ({ className }: P) => (
  <svg {...base} className={className}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></svg>
);
export const FacebookIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.500A.5.5 0 0 1 14 8Z" /></svg>
);
export const MedicalCrossIcon = ({ className }: P) => (
  <svg {...base} width={16} height={16} className={className}><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z" /></svg>
);
