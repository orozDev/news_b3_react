// eslint-disable-next-line react/prop-types
import {useEffect, useState} from "react";

export const PrimaryInput = ({className = '', ...props}) => {
    return <input className={`primary-input ${className}`} {...props} />
}

// eslint-disable-next-line react/prop-types
export const PrimaryTextArea = ({className = '', children, ...props}) => {
    return <textarea className={`primary-input ${className}`} {...props} >{children}</textarea>
}


// eslint-disable-next-line react/prop-types
export const PrimaryFetchSelect = ({className = '', label='Select item', url, ...props}) => {

    const [items, setItems] = useState([])
    useEffect(() => {
        fetch(url).then(res => res.json()).then(res => setItems(res.results))
    }, [])

    return <select className={`primary-select ${className}`} {...props}>
        <option disabled={true} selected={true}>{label}</option>
        {items.map(item =>
            <option key={item.id} value={item.id}>{item.title}</option>
        )}
    </select>
}