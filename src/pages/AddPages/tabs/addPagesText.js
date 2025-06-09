
// Hooks
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

import { Button, Icon, TextArea, LoadingComponent } from "ama-design-system";
import { urlValidator } from '../../Website/utils'

import { api } from '../../../config/api'

export function AddPagesText({ data, name, setShowSecondModal, closeModal }) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [urls, setUrls] = useState([]);

  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
 
    e.preventDefault()
    setLoading(true)
    if(urls.length <= 0){
      setError(t("ADD_PAGES.required"))
      setLoading(false)
      return;
    }
   
    const urlsSeperated = urls.split("\n").filter((a) => a !== "");
    if(urlsSeperated.length <= 0){
      setError(t("ADD_PAGES.required"))
      setLoading(false)
      return;
    }
    const { invalid, cleanedUrls } = urlValidator(t, urlsSeperated, data.startingUrl)
    if (invalid !== "") {
      setError(invalid)
    } else {
      setError("")
      const { response, err } = await api.addPageCreate(cleanedUrls, data.startingUrl, name)
      if (err && err.code && err.code === "ERR_NETWORK") {
        setApiError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if (response && response.data.success === 1) {
        setShowSecondModal(true)
     

      }
    }
    setLoading(false)
  }
  const IconWithText = ({ name, description, text }) => (
    <>
      <Icon name={name} description={description}/>
      <span className="visually-hidden">{text}</span>
    </>
  );
  return (
    <>
      <form onSubmit={handleSubmit} novalidate>
      {!error && <span className={`ama-typography-body-large ${theme === "light" ? "" : "text-white"} mt-2`}>
          <IconWithText description={"Aviso"} text={"Atenção:"} name="AMA-Interrogacao-Solid" />
          {t("ADD_PAGES.hint")}
        </span>}
        <TextArea
          label={`${t("ADD_PAGES.pages_label")}*`}
          darkTheme={theme}
          type={'text'}
          aria-required="true"
          error={error}
          onChange={(e) => setUrls(e.target.value)}
          id={"add_pages_text_area"}
        />
   
        {!loading ?
          !apiError ?
            <Button
              darkTheme={theme}
              variant={"primary"}
              text={t(`ADD_PAGES.button`)}
              className={"mt-3"}
              type={"submit"}
              size={"lg"}
              aria-disabled={!urls} 
              iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
            />
            : <h3 className="text-center mt-5 bold">{apiError}</h3>
          : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
      </form>
    </>
  );
}
