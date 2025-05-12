import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext"; 
import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectionPage = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);

  const toggleLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem("selectedLanguage", lang);
      setShowOptions(false);
    } catch (error) {
      console.error("Language change error:", error);
    }
  };

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem("selectedLanguage");
      if (storedLang) {
        i18n.changeLanguage(storedLang);
      }
    };
    loadLanguage();
  }, []);
  return (
    <View style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
      {/* 🌍 Language & Dark Mode Selector */}
      <View style={styles.topControls}>
        <TouchableOpacity
          style={[styles.selector, isDarkMode ? styles.darkButton : styles.lightButton]}
          onPress={() => setShowOptions(!showOptions)}
        >
          <FontAwesome5 name="language" size={22} color={isDarkMode ? "#fff" : "#333"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selector, isDarkMode ? styles.darkButton : styles.lightButton]}
          onPress={toggleTheme}
        >
          <FontAwesome5 name={isDarkMode ? "moon" : "sun"} size={22} color={isDarkMode ? "#fff" : "#333"} />
        </TouchableOpacity>
      </View>
      {/* Language Dropdown */}
      {showOptions && (
        <View style={[styles.dropdown, isDarkMode ? styles.darkDropdown : styles.lightDropdown]}>
          {[
            { code: "en", label: "🇺🇸 English" },
            { code: "hi", label: "🇮🇳 हिंदी" },
            { code: "tu", label: "🇮🇳 తెలుగు" },
            { code: "ml", label: "🇮🇳 മലയാളം" },
            { code: "kd", label: "🇮🇳 ಕನ್ನಡ" },
            { code: "tl", label: "🇮🇳 தமிழ்" },
          ].map((lang) => (
            <TouchableOpacity key={lang.code} style={styles.option} onPress={() => toggleLanguage(lang.code)}>
              <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/* 🛠️ Admin Icon */}
      <TouchableOpacity style={styles.adminIcon} onPress={() => navigation.navigate("AdminLoginPage")}>
        <FontAwesome5 name="user-cog" size={28} color={isDarkMode ? "#0af" : "#007bff"} />
      </TouchableOpacity>

      {/* 🚗 Illustration */}
      <Image source={require("./roadside/illustration.png")} style={styles.illustration} />

      {/* 🚀 App Title */}
      <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>RAVB Assistance</Text>
      <Text style={[styles.subHeader, isDarkMode ? styles.darkSubText : styles.lightSubText]}>{t("choose_role")}</Text>

      {/* 👤 User Login */}
      <TouchableOpacity
        style={[styles.button, isDarkMode ? styles.darkUserButton : styles.lightUserButton]}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <FontAwesome5 name="user" size={20} color="#fff" />
        <Text style={styles.buttonText}>{t("user_login")}</Text>
      </TouchableOpacity>

      {/* 🛠️ Mechanic Login */}
      <TouchableOpacity
        style={[styles.button, isDarkMode ? styles.darkMechanicButton : styles.lightMechanicButton]}
        onPress={() => navigation.navigate("Registermech")}
      >
        <FontAwesome5 name="tools" size={20} color="#fff" />
        <Text style={styles.buttonText}>{t("mechanic_login")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  lightMode: {
    backgroundColor: "#FFFFFF",
  },
  darkMode: {
    backgroundColor: "#121212",
  },
  topControls: {
    position: "absolute",
    top: 40,
    left: 20,
    flexDirection: "row",
    gap: 10,
  },
  selector: {
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  lightButton: {
    backgroundColor: "#ddd",
  },
  darkButton: {
    backgroundColor: "#333",
  },
  dropdown: {
    position: "absolute",
    top: 90,
    left: 20,
   zIndex : 9999,
    borderRadius: 5,
    padding: 8,
    elevation: 5,
  },
  lightDropdown: {
    backgroundColor: "#fff",
  },
  darkDropdown: {
    backgroundColor: "#333",
  },
  option: {
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lightText: {
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  lightSubText: {
    color: "#666",
  },
  darkSubText: {
    color: "#aaa",
  },
  adminIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  illustration: {
    width: 300,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    width: "85%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  lightUserButton: {
    backgroundColor: "#007bff",
  },
  darkUserButton: {
    backgroundColor: "#444",
  },
  lightMechanicButton: {
    backgroundColor: "#ff6f00",
  },
  darkMechanicButton: {
    backgroundColor: "#cc6600",
  },
});
