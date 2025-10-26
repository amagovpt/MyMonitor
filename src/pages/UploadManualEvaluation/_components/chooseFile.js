// Hooks
import { useContext, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

import { Button, Icon, LoadingComponent, RadioGroup } from "ama-design-system";

import { validateManualEvaluation } from '../utils';

import { api } from '../../../config/api';

export function ChooseFile({ data, openDialog, setOpenDialog }) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState("");

  const [loading, setLoading] = useState(false);
  const [checklist, setChecklist] = useState(null);
  const [value, setValue] = useState(null);
  const [fileData, setFileData] = useState(null);

  const fileInputRef = useRef(null);

  const textColorTheme = theme === "light" ? "" : "text-white";

  const checklistsData = [{
    id: "1",
    name: t("UPLOAD_MANUAL_EVALUATION.content_aspects_checklist")
  }, {
    id: "2",
    name: t("UPLOAD_MANUAL_EVALUATION.functional_aspects_checklist")
  }, {
    id: "3",
    name: t("UPLOAD_MANUAL_EVALUATION.transactional_aspects_checklist")
  }]

  const handleButtonClick = () => {
    // Trigger a click event on the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChecklistChange = async (event) => {
    const newChecklist = checklistsData[event - 1].name;
    setChecklist(newChecklist);
    setValue(event);
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file === null) {
      return;
    }

    switch (file.type) {
      case "application/json":
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          const data = reader.result.toString();
          const newFileData = JSON.parse(data);
          setFileData(newFileData);
        }
        break;
      default:
        setError(t("UPLOAD_MANUAL_EVALUATION.sitemap.type_invalid"));
        break;
    }
  };

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // Test File
    const { invalid, cleanedEvaluation } = validateManualEvaluation(t, fileData, checklist, data.startingUrl);
    if (invalid !== "") {
      setError(invalid);
    } else {
      setError("");
      
      openUploadEvaluationInformationDialog(t, checklist, cleanedEvaluation);
    }
    setLoading(false);
  }

  const openUploadEvaluationInformationDialog = async (t, checklist, data) => {
    const {response, err} = await api.uploadManualEvaluation({ t, checklist, data });
    if (err && err.code && err.code === "ERR_NETWORK") {
      setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
    } else if (response && response.data.success === 1) {
      setOpenDialog(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="ps-3 error bold">{error}</p>}
      <div className={`mb-3 ${textColorTheme}`}>
        {t("UPLOAD_MANUAL_EVALUATION.sitemap.warning_text")}
        <a href={"https://cesperanc.github.io/a11y-pt-PT-checklists/checklist-contents.html"} aria-describedby="new-window-info" target="_blank" download className="ama-typography-action px-1 text_link">{t("UPLOAD_MANUAL_EVALUATION.sitemap.content_aspects_checklist_url")}</a>
        {t("UPLOAD_MANUAL_EVALUATION.sitemap.comma")}
        <a href={"https://cesperanc.github.io/a11y-pt-PT-checklists/checklist-10aspetos.html"} aria-describedby="new-window-info" target="_blank" download className="ama-typography-action px-1 text_link">{t("UPLOAD_MANUAL_EVALUATION.sitemap.functional_aspects_checklist_url")}</a>
        {t("UPLOAD_MANUAL_EVALUATION.sitemap.and")}
        <a href={"https://cesperanc.github.io/a11y-pt-PT-checklists/checklist-transaction.html"} aria-describedby="new-window-info" target="_blank" download className="ama-typography-action px-1 text_link">{t("UPLOAD_MANUAL_EVALUATION.sitemap.transactional_aspects_checklist_url")}</a>
      </div>
      <label htmlFor={t("UPLOAD_MANUAL_EVALUATION.evaluation_type_label")} className={`mb-3 ${textColorTheme}`} >{t("UPLOAD_MANUAL_EVALUATION.sitemap.evaluation_title")}</label>
      <div id={t("UPLOAD_MANUAL_EVALUATION.evaluation_type_label")}>
        <RadioGroup
          aria-label={t("UPLOAD_MANUAL_EVALUATION.evaluation_type_label")}
          data={checklistsData}
          value={value}
          onChange={handleChecklistChange}
        />
      </div>
      <label htmlFor={t("UPLOAD_MANUAL_EVALUATION.file_name_label")} className={`mb-3 ${textColorTheme}`} >{t("UPLOAD_MANUAL_EVALUATION.sitemap.file_title")}</label>
      <div className="input-group mb-4 d-flex justify-content-start align-items-start">
        {!openDialog &&
          <button className={`btn ${textColorTheme}`} type="button" onClick={handleButtonClick}>
            {t("UPLOAD_MANUAL_EVALUATION.file_name_label")}
          </button>
        }
       
        <input
          id={t("UPLOAD_MANUAL_EVALUATION.file_name_label")}
          ref={fileInputRef}
          type="file"
          className="form-control"
          aria-label="Upload"
          onChange={handleFileChange}
          accept=".json"
        />
      </div>
     
      {!loading ?
        !apiError ?
          <Button
            darkTheme={theme}
            variant={"primary"}
            text={t(`UPLOAD_MANUAL_EVALUATION.button`)}
            className={"mt-3"}
            type={"submit"}
            size={"lg"}
            disabled={!checklist || !fileData}
            aria-disabled={!checklist || !fileData}
            iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
          />
          : <h3 className="text-center mt-5 bold">{apiError}</h3>
        : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
    </form>
  );
}
