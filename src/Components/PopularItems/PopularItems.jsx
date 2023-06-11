import { useEffect, useState } from "react";
import PopularItemsCard from "./PopularItemsCard";
import { Fade } from "react-awesome-reveal";

const PopularItems = () => {
    const [allItems, setAllItems] = useState([]);
    useEffect(() => {
        fetch("popularItem.json")
            .then(res => res.json())
            .then(data => {
                setAllItems(data)
            })
    }, [])
    return (
        <div className="mx-4">
            <div className="mt-16 mb-6">
                <Fade direction="down" delay={500}>
                    <h2 className="text-5xl font-serif font-bold mb-6 mt-10 text-center text-fuchsia-700"> Popular <span className="text-pink-700">Items</span> </h2>
                </Fade>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 py-10">
                <Fade direction="left" delay={500}>

                    {
                        allItems.map((item, i) => <PopularItemsCard key={i} item={item}></PopularItemsCard>)
                    }

                </Fade>
            </div>
        </div>
    );
};

export default PopularItems;