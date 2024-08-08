import { pathURL } from "../../App";

// Function to get additional Arrays
// t -> the translation function
// RETURNS
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoryTable (t, navigate) {
    const directoriesHeaders = [
      [
        {type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.rank"), property: "rank"},
        {type: "SortingText", bigWidth: "50%", name: t("WEBSITE_TABLE.table.name"), property: "name"},
        {type: "SortingIcon", name: "AMA-DeclaracaoDark-Line", description: t("WEBSITE_TABLE.table.declaration"), property: "declaration"},
        {type: "SortingIcon", name: "AMA-SeloDark-Line", description: t("WEBSITE_TABLE.table.stamp"), property: "stamp"},
        {type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.score"), property: "score", justifyCenter: true},
        {type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.pages"), property: "nPages", justifyCenter: true},
        {type: "Text", name: t("WEBSITE_TABLE.table.levels"), property: "", justifyCenter: true, multiCol: true, nCol: 3},
      ],
      [
        {type: "Empty", nCol: 6, name: t("MISC.empty"), multiCol: true, empty: true},
        {type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.A"), property: "A", justifyCenter: true},
        {type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.AA"), property: "AA", justifyCenter: true},
        {type: "SortingText", bigWidth: "10%", name: t("WEBSITE_TABLE.table.AAA"), property: "AAA", justifyCenter: true}
      ]
    ]
    
    let columnsOptions = {
      id: { type: "Skip", center: false, bold: false, decimalPlace: false },
      rank: { type: "Number", center: true, bold: false, decimalPlace: false },
      name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => navigate(`${pathURL}user/${row['name']}`) },
      entity: { type: "Skip", center: false, bold: false, decimalPlace: false },
      declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
      stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
      score: { type: "Number", center: true, bold: false, decimalPlace: true },
      nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
      A: { type: "Number", center: true, bold: false, decimalPlace: false },
      AA: { type: "Number", center: true, bold: false, decimalPlace: false },
      AAA: { type: "Number", center: true, bold: false, decimalPlace: false },
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
      t("WEBSITE_TABLE.table.paginator.per_page")
    ]

    let itemsPaginationText = [
      t("WEBSITE_TABLE.table.paginator.of"),
      t("WEBSITE_TABLE.table.paginator.items")
    ]

    return { directoriesHeaders, columnsOptions, nameOfIcons, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText }
}