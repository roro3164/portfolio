"use client";
import { useState } from "react";
import ButtonNeuromorphic from "../../Header/ButtonNeuromorphic";
import VioletHover from "../hover/VioletHover";
import { ConfirmationPopup } from "./ConfirmationPopup";
import styles from "./Form.module.scss";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const FormCard = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: null as string | null,
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ submitted: false, submitting: true, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      setStatus({ submitted: true, submitting: false, error: null });
      setFormData({ 
        firstName: "", 
        lastName: "", 
        company: "", 
        email: "", 
        phone: "",    
        message: "" 
      });

    } catch (error: unknown) {
      let message = "An unknown error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      setStatus({
        submitted: false,
        submitting: false,
        error: message,
      });
      setShowConfirmation(false);
    }
  };

  const handleButtonClick = () => {
    if (!status.submitting) {
      setFieldErrors({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      });

      let hasErrors = false;
      const newErrors = {
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      };

      if (!formData.firstName.trim()) {
        newErrors.firstName = 'Le prénom est requis';
        hasErrors = true;
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Le nom est requis';
        hasErrors = true;
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Le téléphone est requis';
        hasErrors = true;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'L\'email est requis';
        hasErrors = true;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Format email invalide';
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setFieldErrors(newErrors);
        return;
      }

      const formElement = document.querySelector("form");
      if (formElement) {
        setShowConfirmation(true);
        formElement.requestSubmit();
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20, x: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="lg:w-[80%] mx-auto">
          <VioletHover>
            <div className="bg-[#100E12] rounded-xl">
              <form 
                onSubmit={handleSubmit} 
                className={styles.glassContact}
                autoComplete="off"
              >
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${styles.internBoxContact} bg-transparent`}
                  placeholder={t("contactForm.firstName")}
                  autoComplete="off"
                  required
                />
                {fieldErrors.firstName && (
                  <div className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</div>
                )}

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${styles.internBoxContact} bg-transparent`}
                  placeholder={t("contactForm.lastName")}
                  autoComplete="off"
                  required
                />
                {fieldErrors.lastName && (
                  <div className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</div>
                )}

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${styles.internBoxContact} bg-transparent`}
                  placeholder={t("contactForm.phone")}
                  autoComplete="off"
                  required
                />
                {fieldErrors.phone && (
                  <div className="text-red-500 text-sm mt-1">{fieldErrors.phone}</div>
                )}

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.internBoxContact} bg-transparent`}
                  placeholder={t("contactForm.email")}
                  autoComplete="off"
                  required
                />
                {fieldErrors.email && (
                  <div className="text-red-500 text-sm mt-1">{fieldErrors.email}</div>
                )}
                
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`${styles.internBoxContact} bg-transparent`}
                  placeholder={t("contactForm.company")}
                  autoComplete="off"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.internBoxContact} ${styles.message} bg-transparent`}
                  placeholder={t("contactForm.message")}
                  autoComplete="off"
                ></textarea>

                <div className="mx-auto flex justify-center">
                  <div
                    onClick={handleButtonClick}
                    className={`cursor-pointer w-full max-w-[280px] ${
                      status.submitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <ButtonNeuromorphic
                      type="button"
                      text={t("hero.cta.button", { ns: "page" })}
                      disabled={status.submitting}
                      loading={status.submitting}
                      className="w-full justify-center"
                      size="lg"
                      fontSize={20}
                      borderRadius={12}
                    />
                  </div>
                </div>

                {status.error && (
                  <div className="text-red-500 mt-4 text-center">
                    {t("contactForm.error")} : {status.error}
                  </div>
                )}
              </form>
            </div>
          </VioletHover>
        </div>
      </motion.div>

      <ConfirmationPopup 
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </>
  );
};
