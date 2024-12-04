
// Hooks
import { useContext, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../../context/ThemeContext";

import { Button, Icon, LoadingComponent } from "ama-design-system";

import { pathURL } from "../../../../App";
import { urlValidator } from '../../utils'

import { api } from '../../../../config/api'

export function ChooseFileAddPage({data, name, setShowSecondModal, closeModal}) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState("");

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const [urls, setUrls] = useState([]);

  const handleButtonClick = () => {
    // Trigger a click event on the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];

    let urisFromFile = [];
    if (file === null && file.type) {
      return;
    }

    switch (file.type) {
      case "text/plain":
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          const urlFile = reader.result.toString();
          const lines = urlFile.split("\n").map((l) => l.trim()).filter((u) => u !== "");
          urisFromFile = lines
          setUrls(urisFromFile)
          console.log(urisFromFile)
        };
        break;
      case "text/xml":
        const readerXML = new FileReader();
        readerXML.readAsText(file);
        readerXML.onload = () => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(readerXML.result.toString(), "text/xml");
    
          const urlsXML = doc.getElementsByTagName("loc");
          for (let i = 0; i < urlsXML.length; i++) {
            const url = urlsXML.item(i).textContent;
            urisFromFile.push(url)
          }
          setUrls(urisFromFile)
          console.log(urisFromFile)
        };
        break;
      default:
        setError(t("ADD_PAGES.sitemap.type_invalid"))
        break;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // Test URLs
    const {invalid, cleanedUrls} = urlValidator(t, urls, data.startingUrl)
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
    <form onSubmit={handleSubmit}>
      <label htmlFor={t("ADD_PAGES.file_name_label")} className="mb-3">{t("ADD_PAGES.sitemap.title")}</label>
      <div className="input-group mb-2 d-flex justify-content-start align-items-start">
        <button className="btn" type="button" onClick={handleButtonClick}>
          {t("ADD_PAGES.file_name_label")}
        </button>
        <input
          id={t("ADD_PAGES.file_name_label")}
          ref={fileInputRef}
          type="file"
          className="form-control"
          aria-label="Upload"
          onChange={handleChange}
          accept=".txt, .xml"
        />
      </div>
      {error && <p className="ps-3 error bold">{error}</p>}
      <div className="mb-5">
        {t("ADD_PAGES.sitemap.warning_text")}
        <a href={`${pathURL}assets/sitemap/example_sitemap.txt`} target="_blank" className="ama-typography-action px-1 text_link">{t("ADD_PAGES.sitemap.txt_example")}</a>
        {t("ADD_PAGES.sitemap.and")}
        <a href={`${pathURL}assets/sitemap/example_sitemap.xml`} target="_blank" className="ama-typography-action px-1 text_link">{t("ADD_PAGES.sitemap.xml_example")}</a>
      </div>
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
  );
}
