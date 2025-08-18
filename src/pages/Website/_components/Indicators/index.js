import './style.indicators.css';

export default function Indicators({
   listItems
}) {
    return (
        <div id="indicators" >
            <ul className="list-group">
                {
                    listItems.map((item, index) => (
                        <li key={index} className="list-group-item d-flex flex-column justify-content-between ">

                                <div className='d-flex justify-content-between w-100'>
                                <span className={`badge badge-primary badge-pill`}>{item.title}</span>
                                
                                <span className={`badge badge-primary badge-pill`}>{item.value}</span>
                                </div>
                                
                                {item.itemsList && (<ul className="list-group w-100 mt-3">
                                {
                                   item.itemsList.map((subitem, i) => (
                                        <li key={i}  className='list-group-item d-flex justify-content-between align-items-center'>
                                            <span className={`badge badge-primary badge-pill`}>{subitem.title}</span>
                                            
                                            <span className={`badge badge-primary badge-pill`}>{subitem.value}</span>
                                        </li>)
                                    )
                                }
                            </ul>)}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
