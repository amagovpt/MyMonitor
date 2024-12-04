
// Hooks
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';

// Dark / Light Theme Context
import { ThemeContext } from "../../../../context/ThemeContext";

import { Tabs, Button, Icon } from "ama-design-system";

import { ChooseFileAddPage } from "./chooseFileAddPage";
import { AddPagesText } from "./addPagesText";
import { Crawl } from "./crawl";

import { api } from '../../../../config/api'

export function AddPagesSection({data, name, mainTheme, closeModal, setShowSecondModal}) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [message, setMessage] = useState(false);

  const tabsAddPages = [
    {
      eventKey: "tab1",
      title: t("ADD_PAGES.tab1"),
      component:
      <div className={`${mainTheme}`}>
        <AddPagesText data={data} name={name} setShowSecondModal={setShowSecondModal} closeModal={closeModal} />
      </div>,
    },
    {
      eventKey: "tab2",
      title: t("ADD_PAGES.tab2"),
      component:
      <div className={`${mainTheme}`}>
        <ChooseFileAddPage data={data} name={name} setShowSecondModal={setShowSecondModal} closeModal={closeModal} />
      </div>,
    },
    {
      eventKey: "tab3",
      title: t("ADD_PAGES.tab3"),
      component:
      <div className={`${mainTheme}`}>
        <Crawl data={data} name={name} setShowSecondModal={setShowSecondModal} closeModal={closeModal} />
      </div>,
    },
    {
      eventKey: "tab4",
      title: t("ADD_PAGES.tab4"),
      component:
      <>
        <div className="d-flex flex-row justify-content-start align-items-center gap-4 crawl_actions">
          <div>
            {t("ADD_PAGES.transfer.message")}
          </div>
          <Button
            darkTheme={theme}
            variant={"primary"}
            text={t(`ADD_PAGES.transfer.button`)}
            size={"lg"}
            onClick={() => transferPages()}
          />
        </div>
        {message && <p className="text-center bold ama-typography-body-large mt-3">{message}</p>}
      </>,
    },
  ];

  const transferPages = async () => {
    const {response, err} = await api.addPageTransfer(name)
    if(err && err.code && err.code === "ERR_NETWORK") {
      setMessage(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
    } else if (err && err.code && err.code !== "ERR_NETWORK") {
      setMessage(t(`ADD_PAGES.transfer.error`))
    } else if (response && response.data.success === 1) {
      setMessage(t(`ADD_PAGES.transfer.success`))
    }
  }

  return (
    <>
      <div className="modal_container d-flex flex-column p-4">
        <div className="d-flex flex-row justify-content-between mb-3 align-items-center">
          <h2>{t("ADD_PAGES.title")}</h2>
          <Button
            darkTheme={theme}
            variant={"secondary"}
            className={"close_modal"}
            aria-label={t(`ADD_PAGES.evaluations_dialog.close`)}
            text={t(`ADD_PAGES.evaluations_dialog.close`)}
            onClick={() => closeModal()}
            size={"lg"}
            iconRight={<Icon name="AMA-Erro2-Line" />}
          />
        </div>
        <Tabs tabs={tabsAddPages} defaultActiveKey="tab1" vertical={false} darkTheme={theme} />
      </div>
    </>
  );
}
