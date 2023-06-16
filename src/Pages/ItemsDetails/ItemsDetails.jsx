import { useLoaderData } from "react-router-dom";
import ItemsDetailsCard from "./ItemsDetailsCard";
import { Fade } from "react-awesome-reveal";
import { useEffect } from "react";

const ItemsDetails = () => {
    const AllItems = useLoaderData()
    const IndividualItem = AllItems[0].items

    // this useEffect use for fixed show top position of the page . now react doesnt 
    //show the middle of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
            <div>
                <Fade direction="down">
                    <h2 className="text-4xl font-serif font-bold mb-6 pt-10 text-center text-fuchsia-700"> All <span className="text-pink-700">{AllItems[0].title}</span> Items</h2>
                </Fade>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 pb-10">
                {
                    IndividualItem.map((item, i) => <ItemsDetailsCard key={i} item={item}>

                    </ItemsDetailsCard>)
                }
            </div>
        </div>
    );
};

export default ItemsDetails;