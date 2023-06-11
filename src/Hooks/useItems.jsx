import { useEffect, useState } from "react";

const useItems = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("items.json")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])
    return [data]
};

export default useItems;