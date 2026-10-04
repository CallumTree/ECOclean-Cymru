export const WHATSAPP_NUMBER = "447432670535";
export const WHATSAPP_DISPLAY_NUMBER = "07432 670535";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const CONTACT_EMAIL = "leanne@ecocleancymru.com";

export const WEB3FORMS_ACCESS_KEY = "dd18c611-7469-46b7-8d93-ed42f4204cb4";
