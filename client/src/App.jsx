import { LucideProvider } from "lucide-react";

import AppRoutes from "./routes/AppRoutes";

// همه‌ی آیکون‌های سایت (lucide-react): اندازه‌ی ۲۰ و ضخامت خط ۲ یکسان؛ رنگ از متن (currentColor)
// تا در حالت شب هم درست دیده بشن. فقط آیکون‌های ریز کنار متن‌های کوچک size={16} می‌گیرن.
function App() {
  return (
    <LucideProvider size={20} strokeWidth={2}>
      <AppRoutes />
    </LucideProvider>
  );
}

export default App;