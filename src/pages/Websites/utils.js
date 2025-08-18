import { pathURL } from "../../App";
import { Link } from "react-router-dom";
import DeclarationIcon from "./_components/DeclarationIcon";
import StampIcon from "./_components/StampIcon";

// Function to get additional Arrays
// t -> the translation function
// RETURNS
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoryTable (t) {
    const directoriesHeaders = [
      [
        {type: "SortingText", nRow: 2, bigWidth: "17%", name: t("WEBSITE_TABLE.table.rank"), property: "rank"},
        {type: "SortingText", nRow: 2, bigWidth: "50%", name: t("WEBSITE_TABLE.table.name"), property: "name"},
        {type: "SortingIcon", nRow: 2, name: "AMA-DeclaracaoDark-Line", description: t("WEBSITE_TABLE.table.declaration"), property: "declaration"},
        {type: "SortingIcon", nRow: 2, name: "AMA-SeloDark-Line", description: t("WEBSITE_TABLE.table.stamp"), property: "stamp"},
        {type: "SortingText", nRow: 2, bigWidth: "10%", name: t("WEBSITE_TABLE.table.score"), property: "score", justifyCenter: true},
        {type: "SortingText", nRow: 2, bigWidth: "10%", name: t("WEBSITE_TABLE.table.pages"), property: "nPages", justifyCenter: true},
        {id: "conformidade", type: "Text", name: t("WEBSITE_TABLE.table.levels"), property: "", justifyCenter: true, multiCol: true, nCol: 3},
      ],
      [
        {id: "A", type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.A"), property: "A", justifyCenter: true, ariaLabel: true},
        {id: "AA", type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.AA"), property: "AA", justifyCenter: true, ariaLabel: true},
        {id: "AAA", type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.AAA"), property: "AAA", justifyCenter: true, ariaLabel: true}
      ]
    ]
    
    let columnsOptions = {
      id: { type: "Skip", center: false, bold: false, decimalPlace: false },
      rank: { type: "Number", center: true, bold: false, decimalPlace: false },
      name: { type: "Link", center: false, bold: false, decimalPlace: false, children: (row, data) => {
        return <Link to={`${pathURL}user/${row['name']}`} className="ama-typography-action-large bold">{data}</Link>
      }},
      entity: { type: "Skip", center: false, bold: false, decimalPlace: false },
      declaration: { type: "Link", center: true, bold: false, decimalPlace: false, children: (row, data) => {
        return <DeclarationIcon value={data} darkTheme={false} />
      }},
      stamp: { type: "Link", center: true, bold: false, decimalPlace: false, children: (row, data) => {
        return <StampIcon value={data} darkTheme={false} />
      }},
      score: { type: "Number", center: true, bold: false, decimalPlace: true },
      nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
      A: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "conformidade A" },
      AA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "conformidade AA" },
      AAA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "conformidade AAA" },
    }

    let nameOfIcons = [
      t("WEBSITE_TABLE.table.stamp_bronze"),
      t("WEBSITE_TABLE.table.stamp_silver"),
      t("WEBSITE_TABLE.table.stamp_gold"),
      t("WEBSITE_TABLE.table.declaration_not_conform"),
      t("WEBSITE_TABLE.table.declaration_partial_conform"),
      t("WEBSITE_TABLE.table.declaration_conform")
    ]

    let paginationButtonsTexts = [
      t("WEBSITE_TABLE.table.paginator.first_page"),
      t("WEBSITE_TABLE.table.paginator.previous_page"),
      t("WEBSITE_TABLE.table.paginator.next_page"),
      t("WEBSITE_TABLE.table.paginator.last_page")
    ]

    let nItemsPerPageText=[
      t("WEBSITE_TABLE.table.paginator.see"),
      t("WEBSITE_TABLE.table.paginator.per_page"),
      t("WEBSITE_TABLE.table.paginator.selectorAria"),
      t("WEBSITE_TABLE.table.paginator.selectorNav")
    ]

    let itemsPaginationText = [
      t("WEBSITE_TABLE.table.paginator.of"),
      t("WEBSITE_TABLE.table.paginator.items")
    ]

    let ariaLabels = {
      A: t("WEBSITES_PAGE.ariaLabels.A"),
      AA: t("WEBSITES_PAGE.ariaLabels.AA"),
      AAA: t("WEBSITES_PAGE.ariaLabels.AAA")
    }

    return { directoriesHeaders, columnsOptions, nameOfIcons, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText, ariaLabels }
}