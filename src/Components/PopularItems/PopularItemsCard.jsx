
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';

const PopularItemsCard = ({ item }) => {

    const HandleAddCart = (id) => {
        console.log("add to cart successfully", id)
    }

    return (
        <div>
            <div className="card  bg-gradient-to-r from-base-300 via-base-200 to-base-300 shadow-xl">
                {/* <figure><img src={item.picture} alt="Shoes" className="h-52 w-full" /></figure> */}

                <PhotoProvider>
                    <PhotoView src={item.picture}>
                        <img src={item.picture} alt="" className="h-52 w-full" />
                    </PhotoView>
                </PhotoProvider>
                <div className="card-body">
                    <h2 className="card-title">
                        {item.name}

                    </h2>
                    <p>{item.name}</p>
                    <p className="font-bold">Price: ${item.price}</p>

                    <div className="card-actions justify-end">
                        <Link to={`/item/details/${item._id}`} state={{ item }}>
                            <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white">See Details</button></Link>
                        <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white " onClick={() => HandleAddCart(item._id)}>Add to Cart</button>
                        <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white">Buy Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularItemsCard;