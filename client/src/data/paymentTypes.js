import { Banknote, FileText } from "lucide-react";
const paymentTypes = [
  {
    value: "cash",
    title: "نقدی",
    icon: Banknote,
  },
  {
    value: "check",
    title: "چکی",
    icon: FileText,
  },
];

export default paymentTypes;
