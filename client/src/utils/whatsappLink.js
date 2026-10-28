import { WHATSAPP_URL } from "../data/contact";

// لینک واتساپ فروشگاه با پیام آماده (مثل استعلام قیمت محصول بی‌قیمت)
export function whatsappMessageUrl(text) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export default whatsappMessageUrl;
