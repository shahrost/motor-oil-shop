import { User } from "lucide-react";
import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import orderAreas from "../../../data/orderAreas";
import { MOBILE_PATTERN } from "../../../utils/phoneInput";
import LocationPicker from "./LocationPicker";

const LABEL_CLASS = "block font-bold text-gray-700 text-sm mb-1.5";
const FIELD_CLASS = "w-full border rounded-xl p-4";

function CustomerInfo({ customer, phoneError, onChange, onPhoneChange, onLocationChange }) {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <h2 className="text-xl font-extrabold text-black mb-6 flex items-center gap-2">
        <User /> {t("order.customerInfo.title")}
      </h2>

      <div className="mb-4">
        <label htmlFor="order-name" className={LABEL_CLASS}>
          {t("order.customerInfo.nameLabel")}
        </label>
        <input
          id="order-name"
          name="name"
          autoComplete="name"
          maxLength={100}
          value={customer.name}
          onChange={onChange}
          placeholder={t("common.fullNamePlaceholder")}
          className={FIELD_CLASS}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="order-phone" className={LABEL_CLASS}>
          {t("order.customerInfo.phoneLabel")}
        </label>
        <input
          id="order-phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          dir="ltr"
          pattern={MOBILE_PATTERN}
          title={t("common.phoneFormat")}
          value={customer.phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder={t("order.customerInfo.phonePlaceholder")}
          maxLength={11}
          aria-invalid={Boolean(phoneError)}
          aria-describedby={phoneError ? "order-phone-error" : undefined}
          className={`${FIELD_CLASS} text-start rtl:placeholder:text-right ${phoneError ? "border-red-500" : ""}`}
          required
        />
        {phoneError && (
          <p id="order-phone-error" role="alert" className="text-red-600 text-sm font-bold mt-1.5">
            {phoneError}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="order-area" className={LABEL_CLASS}>
          {t("order.customerInfo.areaLabel")}
        </label>
        <select
          id="order-area"
          name="area"
          value={customer.area}
          onChange={onChange}
          className={FIELD_CLASS}
          required
        >
          <option value="">{t("order.customerInfo.selectArea")}</option>

          {orderAreas.map((area) => (
            <option key={area.key} value={area.value}>
              {t(`order.customerInfo.areas.${area.key}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="order-address" className={LABEL_CLASS}>
          {t("order.customerInfo.addressLabel")}
        </label>
        <textarea
          id="order-address"
          name="address"
          autoComplete="street-address"
          maxLength={1000}
          value={customer.address}
          onChange={onChange}
          placeholder={t("order.customerInfo.addressPlaceholder")}
          rows="4"
          className={FIELD_CLASS}
          required
        />
      </div>

      <LocationPicker location={customer.location} onChange={onLocationChange} />
    </>
  );
}

export default CustomerInfo;
