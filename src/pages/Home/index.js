import "./styles.css";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Icon, Input, LoadingComponent } from "ama-design-system";
import { ThemeContext } from "../../context/ThemeContext";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "home_dark";

  const [loading, setLoading] = useState(false)

  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.ecosystem"),
      href: "",
      onClick: () => navigate("/")
    },
    {
      title: t("HEADER.NAV.home")
    }
  ];

  return (
    <>
      <div className={`container ${homeDark}`}>
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} darkTheme={theme} />
        </div>

        <section className={`bg-white p-5 d-flex flex-row justify-content-between`}>
          <div className="d-flex flex-column justify-content-evenly">
            <h1>
              {t("LOGIN.title")}
            </h1>
            <p>
              {t("LOGIN.subtitle")}
            </p>
            <form className="login d-flex flex-column">
              <Input darkTheme={theme} label={t("LOGIN.username_label")} type={"text"} className={"mb-3"} />
              <Input darkTheme={theme} label={t("LOGIN.password_label")} type={"password"} className={"mb-3"} error={"dfgdgf"} />
              {!loading ? <Button
                darkTheme={theme}
                className={"align-self-center"}
                variant={"primary"}
                text={t("LOGIN.submit")}
                iconRight={<Icon darkTheme={theme} name="AMA-SetadoisoficialCima-Line" />} 
                iconLeft={
                  <img
                    src={'/img/gov_logo.svg'}
                    alt={'Governo Logo'}
                    className="gov_logo"
                  />
                }
                onClick={() => navigate('/user')}
              /> : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
            </form>
          </div>

          <div className="d-flex flex-row align-items-center right_container">
            <Icon darkTheme={theme} name="AMA-SiteAcessibilidade-Line" />
          </div>
        </section>
      </div>
    </>
  );
}