
// Hooks
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../../context/ThemeContext";

import { Button, Icon, TextArea, LoadingComponent } from "ama-design-system";
import { urlValidator } from '../../utils'

import { api } from '../../../../config/api'

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
    // Test URLs
    const urlsSeperated = urls.split("\n").filter((a) => a !== "");
    const {invalid, cleanedUrls} = urlValidator(t, urlsSeperated, data.startingUrl)
    if(invalid !== "") {
      setError(invalid)
    } else {
      setError("")
      const {response, err} = await api.addPageCreate(cleanedUrls, data.startingUrl, name)
      if(err && err.code && err.code === "ERR_NETWORK") {
        setApiError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if (response && response.data.success === 1) {
        setShowSecondModal(true)
        closeModal()
      }
    }
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextArea
          label={t("ADD_PAGES.pages_label")}
          darkTheme={theme}
          type={'text'}
          error={error}
          onChange={(e) => setUrls(e.target.value)}
          id={"add_pages_text_area"}
        />
        {!error && <span className="ama-typography-body-large">
          <Icon name="AMA-Interrogacao-Solid" />
          {t("ADD_PAGES.hint")}
        </span>}
        {!loading ?
          !apiError ?
            <Button
              darkTheme={theme}
              variant={"primary"}
              text={t(`ADD_PAGES.button`)}
              className={"mt-3"}
              type={"submit"}
              size={"lg"}
              disabled={!urls}
              iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
            />
          : <h3 className="text-center mt-5 bold">{apiError}</h3>
        : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
      </form>
    </>
  );
}
