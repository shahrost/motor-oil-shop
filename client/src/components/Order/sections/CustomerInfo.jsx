import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import orderAreas from "../../../data/orderAreas";

function CustomerInfo({ customer, onChange, onPhoneChange }) {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <h2 className="text-xl font-extrabold text-black mb-6">
        👤 {t("order.customerInfo.title")}
      </h2>

      <input
        name="name"
        value={customer.name}
        onChange={onChange}
        placeholder={t("common.fullNamePlaceholder")}
        className="w-full border rounded-xl p-4 mb-4"
        required
      />

      <input
        name="phone"
        value={customer.phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder={t("order.customerInfo.phonePlaceholder")}
        maxLength="11"
        className="w-full border rounded-xl p-4 mb-4"
        required
      />

      <select
        name="area"
        value={customer.area}
        onChange={onChange}
        className="w-full border rounded-xl p-4 mb-4"
        required
      >
        <option value="">{t("order.customerInfo.selectArea")}</option>

        {orderAreas.map((area) => (
          <option key={area.key} value={area.value}>
            {t(`order.customerInfo.areas.${area.key}`)}
          </option>
        ))}
      </select>

      <textarea
        name="address"
        value={customer.address}
        onChange={onChange}
        placeholder={t("order.customerInfo.addressPlaceholder")}
        rows="4"
        className="w-full border rounded-xl p-4 mb-5"
        required
      />
    </>
  );
}

export default CustomerInfo;
