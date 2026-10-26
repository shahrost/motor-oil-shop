import { Heart, Package, User } from "lucide-react";
// صفحه‌های فهرست حساب کاربری (منوی پروفایل هدر و نوار بالای صفحه‌های حساب)؛
// «تماس با پشتیبانی» و «خروج» صفحه نیستن و جدا در خود منو اضافه می‌شن
const accountMenu = [
  { key: "profile", path: "/account", icon: User },
  { key: "orders", path: "/account/orders", icon: Package },
  { key: "favorites", path: "/account/favorites", icon: Heart },
];

export default accountMenu;
