import { createContext } from "react";

// نام فارسی خودرویی که مشتری از صفحه‌اش محصول رو انتخاب کرده (صفحه‌ی خودرو و صفحه‌ی
// محصولی که از اونجا باز شده). موقع افزودن به سبد روی ردیف سفارش ذخیره می‌شه تا
// ادمین بدونه روغن برای کدوم خودرو بوده. بیرون از صفحه‌ی خودرو: رشته‌ی خالی
const SelectedVehicleContext = createContext("");

export default SelectedVehicleContext;
