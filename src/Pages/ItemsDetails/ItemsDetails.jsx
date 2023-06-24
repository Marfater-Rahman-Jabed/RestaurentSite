// import { useLoaderData } from "react-router-dom";
import ItemsDetailsCard from "./ItemsDetailsCard";
import { Fade } from "react-awesome-reveal";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import BigLoading from "../../Components/Loading/BigLoading";

const ItemsDetails = () => {
    // const AllItems = useLoaderData()
    // const IndividualItem = AllItems[0].items
    const { loading } = useContext(AuthContexts)
    const UrlId = window.location.pathname.split('/')[2];
    const { data: mydata = [], refetch } = useQuery({
        queryKey: ['Datas'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allItem/${UrlId}`)
            const data = res.json()
            return data;
        }
    })
    // console.log(mydata[0].title)
    refetch(`http://localhost:5000/allItem/${UrlId}`)
    // console.log(id)
    // const location = useLocation();
    // const { item._id } = location.state;
    // console.log('items id', item._id)
    // this useEffect use for fixed show top position of the page . now react doesnt 
    //show the middle of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            {
                loading ? <BigLoading></BigLoading> : <div className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
                    <div>
                        <Fade direction="down">
                            <h2 className="text-4xl font-serif font-bold mb-6 pt-10 text-center text-fuchsia-700"> All <span className="text-pink-700">{mydata[0]?.title}</span> Items</h2>
                        </Fade>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 pb-10">
                        {
                            mydata[0]?.items?.map((item, i) => <ItemsDetailsCard key={i} item={item}>

                            </ItemsDetailsCard>)
                        }
                    </div>
                </div>
            }

        </div>
    );
};

export default ItemsDetails;