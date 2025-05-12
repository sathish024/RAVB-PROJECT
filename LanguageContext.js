import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // To persist language choice

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("EN"); // Default to English

  // Function to toggle language and store selection
  const toggleLanguage = async () => {
    const newLang = language === "EN" ? "HI" : "EN";
    setLanguage(newLang);
    await AsyncStorage.setItem("appLanguage", newLang); // Save preference
  };

  // Load stored language when app starts
  React.useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem("appLanguage");
      if (storedLang) setLanguage(storedLang);
    };
    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook to use Language Context
export const useLanguage = () => useContext(LanguageContext);
