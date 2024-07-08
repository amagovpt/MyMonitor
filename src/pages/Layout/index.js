import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { Header, Footer } from 'ama-design-system'

export default function Layout({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n: { changeLanguage, language }} = useTranslation();
  const mainDark = theme === "light" ? "" : "main_dark";

  const toggleLanguage = () => {
    if (language === "en") {
      changeLanguage("pt");
      document.querySelector("html")?.setAttribute("lang", "pt-PT");
    } else {
      changeLanguage("en");
      document.querySelector("html")?.setAttribute("lang", "en");
    }
  };

  return (
    <>
      <Header
        darkTheme={theme}
        title={"My Monitor"}
        title2={" "}
        description={t("HEADER.text")}
        changeTheme={toggleTheme}
        changeLanguage={toggleLanguage}
      />
      <main className={`main ${mainDark}`} id="content" aria-label={t("LOGIN.main_aria")}>
        {children}
      </main>
      <Footer darkTheme={theme} />
    </>
  );
}
