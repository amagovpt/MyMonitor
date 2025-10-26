// Hooks
import { useContext, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

import { Button, Icon, LoadingComponent } from "ama-design-system";

import { api } from '../../../config/api'

export function ChooseFile({ data, openDialog, setOpenDialog }) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState("");

  const [loadingUploadFile, setLoadingUploadFile] = useState(true);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [fileLoading, setFileLoading] = useState(true);

  const [dataFromFile, setDataFromFile] = useState([]);
  const [page, setPage] = useState(null);
  const textColorTheme = theme === "light" ? "" : "text-white"
  const NONE = "None";

  const fileInputRef = useRef(null);

  function handleButtonClick() {
    // Trigger a click event on the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function resetForm() {
    setError("");
    setPage(null);
    setDataFromFile([]);
    setLoadingUploadFile(true);
    setFileLoading(true);
  }

  function selectPage(val) {
    const pg = val.target.value;
    if (pg === NONE) {
      resetForm();
      return;
    }

    setPage(pg);
    setLoadingUploadFile(false);
  }

  function uploadEvaluation(e) {
    e.preventDefault();
    setLoadingUpload(true);

    const pageId = data.pages.find((value) => value.Uri === page).id;
    const fileData = dataFromFile[1];
    
    openUploadEvaluationInformationDialog(pageId, fileData);
    setLoadingUpload(false);
  }

  const openUploadEvaluationInformationDialog = async (pageId, data) => {
    const {response, err} = await api.uploadExtensionEvaluation({ pageId, data });
    if (err && err.code && err.code === "ERR_NETWORK") {
      setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
    } else if (response && response.data.success === 1) {
      setOpenDialog(true);
    }
  }

  function handleFileInput(event) {
    setError("");
    setDataFromFile([]);
    const fileToRead = event.target.files[0];
    if (fileToRead === null) {
      setFileLoading(false);
      return;
    }

    switch (fileToRead.type) {
      case "text/csv":
        parseCSV(fileToRead);
        break;
      default:
        setError(t("UPLOAD_EXTENSION_EVALUATION.ADD.evaluation_type_invalid"));
        break;
    }
  }

  function parseCSV(file) {
    const result = [];
    // open file and check for the urls
    const reader = new FileReader();
    reader.readAsText(file);
    // divide the url in the result array
    reader.onload = () => {
      const csvfile = reader.result.toString();
      const lines = csvfile.split("\n").map((l) => l.trim()).filter((l) => l !== "");

      setDataFromFile(lines);
      validateEvaluationFile(lines);
      setFileLoading(false);
    };
    return result;
  }

  function validateEvaluationFile(data) {
    if (data === null || data.length !== 2) {
      setError(t("UPLOAD_EXTENSION_EVALUATION.ADD.evaluation_file_invalid"));
      return;
    }

    if (!validateEvaluationFileHeaders(data[0].split(";"))) {
      setError(t("UPLOAD_EXTENSION_EVALUATION.ADD.evaluation_file_invalid"));
      return;
    }

    if (data[1].split(";")[0] !== page) {
      setError(t("UPLOAD_EXTENSION_EVALUATION.ADD.evaluation_uri_invalid"));
      return;
    } 
  }

  function validateEvaluationFileHeaders(headers) {
    if (headers === null || headers.length !== 10) {
      return false;
    }

    headers.map((val, idx) => {
      const header = val.trim();
      switch (idx) {
        case 0:
          if (header !== "URL") {
            return false;
          }
          break;
        case 1:
          if (header !== "Pagecode") {
            return false;
          }
          break;
        case 2:
          if (header !== "Conformant") {
            return false;
          }
          break;
        case 3:
          if (header !== "Tot") {
            return false;
          }
          break;
        case 4:
          if (header !== "Nodes") {
            return false;
          }
          break;
        case 5:
          if (header !== "Errors") {
            return false;
          }
          break;
        case 6:
          if (header !== "Tags") {
            return false;
          }
          break;
        case 7:
          if (header !== "Roles") {
            return false;
          }
          break;
        case 8:
          if (header !== "Score") {
            return false;
          }
          break;
        case 9:
          if (header !== "Date") {
            return false;
          }
          break;
        default:
          return false;
      }
    });

    return true;
  }

  return (
    <form onSubmit={uploadEvaluation}>
      {error && <p className="ps-3 error bold">{error}</p>}
      <div className={`mb-3 ${textColorTheme}`}>
        {t("UPLOAD_EXTENSION_EVALUATION.ADD.evaluation_warning")}
      </div>
      <label htmlFor={"pages_uris_input"} className={`mb-3 ${textColorTheme}`} >{t("UPLOAD_EXTENSION_EVALUATION.ADD.uri_label")}</label>
      <select
        id={"pages_uris_input"}
        showSearch
        className="form-control"
        aria-label="Choose"
        onChange={selectPage}
        required
      >
        <option selected={!page} value={NONE}>{NONE}</option>
        { data?.pages?.map((page) =>
          <option value={page.Uri}>{page.Uri}</option>
        )}
      </select>
      <div className="file-select">
        <label htmlFor={t("UPLOAD_EXTENSION_EVALUATION.ADD.upload_evaluation")} className={`mb-3 ${textColorTheme}`} >{t("UPLOAD_EXTENSION_EVALUATION.ADD.file_title")}</label>
        <div className="input-group mb-4 d-flex justify-content-start align-items-start">
          {!openDialog && 
            <button className={`btn ${textColorTheme}`} type="button" onClick={handleButtonClick}>
              {t("UPLOAD_EXTENSION_EVALUATION.ADD.upload_evaluation")}
            </button>
          }
          
          <input
            id={t("UPLOAD_EXTENSION_EVALUATION.ADD.upload_evaluation")}
            ref={fileInputRef}
            type="file"
            className="form-control"
            aria-label="Upload"
            disabled={loadingUploadFile}
            onChange={handleFileInput}
            accept=".csv"
          />
        </div>
      </div>
      <div className="buttons-container">
        <Button 
          darkTheme={theme}
          className={"mt-3"}
          variant={"danger"} 
          size={"lg"}
          onClick={resetForm} 
          text={t("UPLOAD_EXTENSION_EVALUATION.ADD.reset")}
        />
        {!loadingUpload ?
          !apiError ?
            <Button 
              darkTheme={theme}
              className={"mt-3"}
              variant={"primary"} 
              type={"submit"} 
              size={"lg"}
              disabled={error !== '' || fileLoading}
              aria-disabled={error !== '' || fileLoading}
              text={t("UPLOAD_EXTENSION_EVALUATION.ADD.submit")}
              iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
            />
            : <h3 className="text-center mt-5 bold">{apiError}</h3>
          : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />
        }
      </div>
    </form>
  );
}
