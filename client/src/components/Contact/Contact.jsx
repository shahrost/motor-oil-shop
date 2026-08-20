import { useContext } from "react";
import ContactInfo from "./sections/ContactInfo";
import ContactActions from "./sections/ContactActions";
import LanguageContext from "../../context/LanguageContext";

function Contact() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          {t("nav.contact")}
        </h1>

        <p className="text-center mt-5 text-gray-700 text-lg">
          {t("contact.subtitle")}
        </p>

        <ContactInfo />

        <ContactActions />
      </section>
    </div>
  );
}

export default Contact;
