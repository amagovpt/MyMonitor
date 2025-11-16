import React, {useEffect, useState} from "react";
import {Icon, Button} from "ama-design-system";

import "./style.css";

/*
    hasSort -> If Table has sorting
    caption -> Table caption
    headers -> Custom Array of Headers
    dataList -> Array of data
    setDataList -> Set function to change the data shown based on sorting
    columnsOptions -> Custom array to help render the data cells
    nextPage -> Function used for the button click
    darkTheme -> If Dark theme activated or not
    pagination -> If Table has pagination
    itemsPaginationTexts -> Texts for the text telling how many items in that page out of the total
    nItemsPerPageTexts -> Texts for the selection of how many items per page (Pagination)
    iconsAltTexts -> Alternative texts for the icons of the data cells
    paginationButtonsTexts ->  texts for accessibility screen readers for the 4 buttons of pagination (Pagination)
    project -> name of project so that it works in multiple projects
    ariaLabels -> translations for aria-labels to help read "A", "AA", "AAA"
    setCheckboxesSelected -> method to change checkboxes states
    note -> Note for when there are evaluation from the AccessMonitor extension
*/
const SortingTable = (
    { 
        hasSort, 
        caption, 
        headers, 
        dataList, 
        setDataList, 
        columnsOptions, 
        nextPage, 
        darkTheme, 
        pagination, 
        itemsPaginationTexts, 
        nItemsPerPageTexts, 
        iconsAltTexts, 
        paginationButtonsTexts, 
        project, 
        ariaLabels, 
        setCheckboxesSelected,
        note,
    }) => {

    //Evaluations from extension note
    const [displayNote, setDisplayNote] = useState(false);

    //SORT
    const [sort, setSort] = useState({property: null, type: ""});

    //Multi Headers?
    const multiHeaders = Array.isArray(headers[0])

    //Pagination
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [nItemsCurrent, setNItemsCurrent] = useState(50);
    const [list, setList] = useState(null);
    const nAllItems = dataList && dataList.length

    //Check
    const [checkedItems, setCheckedItems] = useState([]);

    // Theme
    const theme = darkTheme === "dark" ? "dark" : ""

    // useEffect that gives the data to the table
    // based on how many items per page is to be shown
    useEffect(() => {
        if(dataList && pagination) {
            setPage(1)
            setLastPage(Math.ceil(dataList.length / nItemsCurrent))
            setList(dataList.slice(0, nItemsCurrent))
        } else {
            setList(dataList)
        }
    }, [nItemsCurrent, dataList])

    // useEffect that runs after a page change
    // Gives the new data to the table
    useEffect(() => {
        if(dataList && pagination) {
            const start = page === 1 ? 0 : (page-1) * nItemsCurrent
            const end = page === 1 ? nItemsCurrent : page * nItemsCurrent
            setList(dataList.slice(start, end))
        } else {
            setList(dataList)
        }
    }, [page])

    // Property sorting function
    const sortByProperty = (property) => {
        return dataList.slice().sort((a, b) => {
            // Gets the values for the given property
            const valueA = a[property]
            const valueB = b[property]

            // If its not the same property then the order is always ASCENDING
            // If its a repeting property then the type being ASCENDING will make
            // in the if's below to sort by DESCENDING
            let type = sort.type
            if(sort.property !== property) {
                type="asc"
            }
            if(property && typeof valueA === "string") {
                if(type === "asc") {
                    // Set the last property and type of sorting
                    setSort({property: property, type: "des"})
                    return (valueA).localeCompare((valueB));
                } else {
                    setSort({property: property, type: "asc"})
                    return (valueB).localeCompare((valueA));
                }
            } else {
                if (type === "asc") {
                    setSort({property: property, type: "des"})
                    if (valueA === null && valueB !== null) return 1;  // null values come after numbers
                    if (valueA !== null && valueB === null) return -1; // numbers come before null values
                    if (valueA === null && valueB === null) return 0;  // both are null
                    return parseFloat(valueA) - parseFloat(valueB);    // both are numbers
                } else {
                    setSort({property: property, type: "asc"})
                    if (valueA === null && valueB !== null) return -1; // null values come before numbers
                    if (valueA !== null && valueB === null) return 1;  // numbers come after null values
                    if (valueA === null && valueB === null) return 0;  // both are null
                    return parseFloat(valueB) - parseFloat(valueA);    // both are numbers
                }
            }
        })
    }


    const addCheckboxes = (checkedData) => {
        if(checkedData !== 'all') {
            let newCheckedItems = [...checkedItems];
            const index = newCheckedItems.findIndex(item => item.id === checkedData.id);
            if (index !== -1) {
                newCheckedItems.splice(index, 1);
            } else {
                newCheckedItems.push(checkedData);
            }
            setCheckedItems(newCheckedItems);
            setCheckboxesSelected(newCheckedItems);
        } else {
            let newCheckedItems = [];

            if (checkedItems.length !== dataList.length) {
                newCheckedItems = [...dataList];
            }
            setCheckedItems(newCheckedItems);
            setCheckboxesSelected(newCheckedItems);
        }
    }



    // Function that renders the Headers of the Table
    // Receives an Object from the custom array that tells everything we need to render
    const renderHeader = (headerData, index) => {
        // If it specifies a nCol means that the header will be more than 1 column
        const nOfColumns = headerData.nCol ? headerData.nCol : 1
        const nOfRows = headerData.nRow ? headerData.nRow : 1
        const noPointer = !hasSort ? 'no_pointer' : ""
        const sameProp = sort.property === headerData.property
        const textCenter = headerData.justifyCenter ? "text-center" : ""
        const bigWidth = headerData.bigWidth ? headerData.bigWidth : "auto"
        const id = headerData.id ? headerData.id : null;

        switch(headerData.type){
            case "Empty":
                return (<th id={multiHeaders ? id : null} key={index} style={{width: bigWidth}} rowSpan={nOfRows} colSpan={nOfColumns} className={`no_pointer`}>
                    <span className="visually-hidden">{headerData.name}</span>
                </th>)
            case "Text":
                return (<th id={multiHeaders ? id : null} aria-label={headerData.ariaLabel ? ariaLabels[headerData.name] : null} key={index} style={{width: bigWidth}} rowSpan={nOfRows} colSpan={nOfColumns} className={`${textCenter} no_pointer`}>
                    <span className="ama-typography-body text-center bold">{headerData.name}</span>
                </th>)
            case "SortingText":
                let justifyCenter = headerData.justifyCenter ? "justify-content-center" : ""
                return (
                    <th id={multiHeaders ? id : null} aria-label={headerData.ariaLabel ? ariaLabels[headerData.name] : null} key={index} style={{width: bigWidth}} rowSpan={nOfRows} colSpan={nOfColumns} aria-sort={sameProp ? (sort.type === "asc" ? "descending" : "ascending"):null} className={sameProp ? `show_icon` : ``} onClick={() => setDataList(sortByProperty(headerData.property))}>
                        <div className={`d-flex ${justifyCenter} align-items-center`}>
                            <span className="ama-typography-body text-center bold">{headerData.name}</span>
                            {sameProp && sort.type === "asc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />}
                        </div>
                    </th>
                )
            case "Icon":
                return (
                    <th id={multiHeaders ? id : null} key={index} style={{width: bigWidth}} rowSpan={nOfRows} colSpan={nOfColumns} className={`${textCenter} ${noPointer} first-show`}>
                        <Icon name={headerData.name} />
                        <span className="visually-hidden">{headerData.description}</span>
                    </th>
                )
            case "SortingIcon":
                return (
                    <th id={multiHeaders ? id : null} key={index} style={{width: bigWidth}} rowSpan={nOfRows} colSpan={nOfColumns} aria-sort={sameProp ? (sort.type === "asc" ? "descending" : "ascending"):null} className={sameProp ? "first-show show_icon" : "first-show"} onClick={() => setDataList(sortByProperty(headerData.property))}>
                        <div className="d-flex align-items-center justify-content-center">
                            <Icon name={headerData.name} />
                            {sameProp && sort.type === "asc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />}
                            <span className="visually-hidden">{headerData.description}</span>
                        </div>
                    </th>
                )
            case "Checkbox":
                return (<th id={multiHeaders ? id : null} key={index} style={{width: bigWidth}} rowSpan={nOfRows} colSpan={nOfColumns} className={`${textCenter} checkbox px-4`}>
                    <input aria-label={headerData.name} type="checkbox" id="checkbox_all" value="all" checked={Object.keys(checkedItems).length === dataList.length} onChange={() => addCheckboxes('all')}></input>
                </th>)
        }
    }


    const renderSpans = (spans) => {
        return spans.map((span, index) => {
            return (<span key={index} className="ama-typography-body mb-1">{span}</span>)
        })
    }

    // Function that renders the individual cells on the table
    // We receive an entire data row, then we go 1 by 1 on the properties of the object
    // Then we also get help from our --> columnsOptions
    // This custom array passed to the component helps us know what to render and what specifics for each cell
    // the custom array will have the same exact properties and for each one will tell if its a Text or a Number or an Icon ...
    const renderAttributes = (row) => {
        return Object.keys(row).map((key, index) => {
            let center = columnsOptions[key].center ? "text-center" : ""
            let bold = columnsOptions[key].bold ? "bold" : ""
            // Use the custom array to check the type of render to do
            switch(columnsOptions[key].type) {
                case "Skip":
                    // Don't render this property
                    return null
                case "Number":
                    // Render a number, if it has "decimalPlace" as TRUE then render the number with 1 decimal place
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{columnsOptions[key].decimalPlace ? row[key].toFixed(1) : row[key]}</td>)
                case "Button":
                    let button = columnsOptions[key].onClick ? columnsOptions[key].onClick : () => {return ""}
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center}`} style={{ justifyItems: "center"}}>
                        <Button
                            darkTheme={theme}
                            className={`${columnsOptions[key].class}`}
                            variant={columnsOptions[key].variant}
                            text={columnsOptions[key].text}
                            onClick={button ? () => button(row, key) : null}
                        />
                    </td>)
                case "ButtonOrLink":
                    let hasDeclaration = columnsOptions[key].checkDeclaration ? (row["declaration"] !== null ? true : false) : true
                    let buttonAction = columnsOptions[key].onClick ? columnsOptions[key].onClick : () => {return ""}
                    let hrefButtonOrLink = columnsOptions[key].href ? columnsOptions[key].href : () => {return ""}
                    // Render a button
                    if(columnsOptions[key].checkDeclaration && (!hasDeclaration || row["declaration"] !== 3)) {
                        return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{columnsOptions[key].noDeclaration}</td>)
                    } else {
                        switch(row[key]) {
                            case null:
                                return (<td headers={columnsOptions[key].headers} key={index} className={`${center}`}  style={{ justifyItems: "center"}}>
                                    <Button
                                        darkTheme={theme}
                                        className={`${columnsOptions[key].class}`}
                                        variant={columnsOptions[key].variant}
                                        text={columnsOptions[key].text}
                                        onClick={buttonAction ? () => buttonAction(row, key) : null}
                                    />
                                </td>)
                            default:
                                return (<td headers={columnsOptions[key].headers} key={index} className={`${center}`}><a href={hrefButtonOrLink(row)} className="ama-typography-action-large bold text-center">{columnsOptions[key].options[row[key]]}</a></td>)
                        }
                    }
                case "Link":
                    let href = columnsOptions[key].href ? columnsOptions[key].href : () => {return ""}
                    // Render a link
                    return columnsOptions[key].children ? <td headers={columnsOptions[key].headers} key={index}>{columnsOptions[key].children(row, row[key])}</td> : <td headers={columnsOptions[key].headers} key={index}><a href={href(row)} className="ama-typography-action-large bold">{row[key]}</a></td>
                case "Text":
                    // Render normal text
                    if(columnsOptions[key].ariaLabel) {
                        return (columnsOptions[key].children
                            ? <td headers={columnsOptions[key].headers} key={index} aria-label={ariaLabels[row[key]]} className={`${center} ${bold} ama-typography-body`}>{columnsOptions[key].children(row, row[key])}</td>
                            : <td headers={columnsOptions[key].headers} key={index} aria-label={ariaLabels[row[key]]} className={`${center} ${bold} ama-typography-body`}>{row[key]}</td>
                        )
                    } else {
                        return (columnsOptions[key].children
                            ? <td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{columnsOptions[key].children(row, row[key])}</td>
                            : <td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{row[key]}</td>
                        )
                    }
                case "Stamp":
                    // Render one of the 3 Stamp Icons based on the number received (from: 1 to 3)
                    switch(row[key]) {
                        case 1:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Selo_Bronze.svg`} alt={iconsAltTexts[0]} /></td>)
                        case 2:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Selo_Prata.svg`} alt={iconsAltTexts[1]} /></td>)
                        case 3:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Selo_Ouro.svg`} alt={iconsAltTexts[2]} /></td>)
                        default:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}>{row[key]}</td>)
                    }
                case "Declaration":
                    // Render one of the 3 Declaration Icons based on the number received (from: 1 to 3)
                    switch(row[key]) {
                        case 1:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Declaracao_Nao_Conforme.svg`} alt={iconsAltTexts[3]} /></td>)
                        case 2:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Declaracao_Parcial_Conforme.svg`} alt={iconsAltTexts[4]} /></td>)
                        case 3:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Declaracao_Conforme.svg`} alt={iconsAltTexts[5]} /></td>)
                        default:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}>{row[key]}</td>)
                    }
                case "MultiText":
                    // Render 2 or more spans that are all normal text.
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} d-flex flex-column multi-text`}>{renderSpans(row[key])}</td>)
                case "DoubleText":
                    // Render 2 texts where the second one is bold and the first one not. If this property also comes with bold then all text will be bold
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><span className="ama-typography-body">{row[key][0]}</span><span className="ama-typography-body bold">{row[key][1]}</span></td>)
                case "DangerousHTML":
                    const hasCode = row[key].includes("<code>")
                    const hasMark = row[key].includes("<mark>")
                    const hasMeta = row[key].includes("<meta")
                    if(hasCode || hasMark || hasMeta) {
                        return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>
                            <span
                                className="span_code"
                                dangerouslySetInnerHTML={{ __html: row[key] }}
                            />
                        </td>)
                    } else {
                        return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{row[key]}</td>)
                    }
                case "Checkbox":
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ama-typography-body checkbox`}>
                        <input aria-label={columnsOptions[key].label + row["Uri"]} type="checkbox" id={row.id} name={row.id} value={`${row}`} checked={checkedItems.findIndex(item => item.id === row.id) !== -1} onChange={() => addCheckboxes(row)}></input>
                    </td>)
                case "Extension":
                    if (row[key] === 1 && !displayNote)
                        setDisplayNote(true);
                    return null;
            }
        })
    }

    return (
        <div className={`ama sorting_table_responsive ${theme}`}>
            <table className="table sorting_table" data-sortable="true">
                {/* Table caption -> descripton of the table */}
                <caption className="visually-hidden">
                    {caption}
                </caption>
                <thead>
                    {/* Check if the array has multiple sub-arrays or not
                        If Yes then means theres more than 1 row of headers
                        If No then it's just 1 row of headers
                    */}
                    {headers && multiHeaders ? 
                        // Multiple rows of headers
                        headers.map((row, index) => {
                            return (<tr key={index}>{row.map((th, index) => { return renderHeader(th, index)})}</tr>)
                        })
                    :
                        <>
                            {/* Just 1 row of headers */}
                            <tr>
                                {headers.map((th, index) => {
                                    return renderHeader(th, index)
                                })}
                            </tr>
                        </>
                    }
                </thead>

                <tbody>
                    {/* Render the data cells of the table */}
                    {list && list.map((row, index) => {
                        return (
                            <tr key={index}>
                                {renderAttributes(row)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Note */}
            {displayNote && <div className={`d-flex flex-row justify-content-end ${theme}`}>
                {note}
            </div>}

            {/* Pagination */}
            {pagination && <div className={`d-flex flex-row justify-content-between pagination ${theme}`}>
                {/* Section informing the number of items in that page from the total*/}
                <div className="ama-typography-body pagination_section">
                    {((page-1)*nItemsCurrent)+ 1 + " - " + (nAllItems > nItemsCurrent && page !== lastPage ? (page*nItemsCurrent) : nAllItems) + itemsPaginationTexts[0] + nAllItems + itemsPaginationTexts[1]}
                </div>

                {/* Section informing the number of items per page and option to change */}
                <nav className="pagination_section" aria-roledescription={nItemsPerPageTexts[3]}>
                    <span className="ama-typography-body">{nItemsPerPageTexts[0]}</span>
                    <select aria-label={nItemsPerPageTexts[2]} className="selection" name="itemsPerPage" id="itemsPerPage" onChange={(e) => setNItemsCurrent(e.target.value)}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                        <option value="500">500</option>
                    </select>
                    <span className="ama-typography-body">{nItemsPerPageTexts[1]}</span>
                </nav>

                {/* Section with the pagination navigation */}
                <div className="pagination_section">
                    <button disabled={page === 1 ? true : false} className={page === 1 ? "disabled button_dir" : "button_dir"} onClick={() => setPage(1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[0]}</span>
                        <Icon name="AMA-LastPage-Solid" />
                    </button>
                    <button disabled={page === 1 ? true : false} className={page === 1 ? "disabled button_dir" : " button_dir"} onClick={() => setPage(page-1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[1]}</span>
                        <Icon name="AMA-SetaDir3-Solid" />
                    </button>
                    <button disabled={page === lastPage ? true : false} className={page === lastPage ? "disabled" : ""} onClick={() => setPage(page+1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[2]}</span>
                        <Icon name="AMA-SetaDir3-Solid" />
                    </button>
                    <button disabled={page === lastPage ? true : false} className={page === lastPage ? "disabled" : ""} onClick={() => setPage(lastPage)}>
                        <span className="visually-hidden">{paginationButtonsTexts[3]}</span>
                        <Icon name="AMA-LastPage-Solid" />
                    </button>
                </div>
            </div>}
        </div>
    );
};

export { SortingTable };