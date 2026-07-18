export const WHATSAPP_NUMBER = "447432670535";
export const WHATSAPP_DISPLAY_NUMBER = "07432 670535";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const CONTACT_EMAIL = "leanne@ecocleancymru.com";

// Free access key from https://web3forms.com — replace before going live.
export const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
