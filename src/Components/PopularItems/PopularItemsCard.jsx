
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';
import { AuthContexts } from '../../Contexts/Contexts';
// import { useQuery } from 'react-query';

const PopularItemsCard = ({ item }) => {
    const { user } = useContext(AuthContexts)
    // const { refetch } = useQuery(`http://localhost:5000/myCart?email=${user?.email}`)

    // refetch(`http://localhost:5000/myCart?email=${user?.email}`)
    const HandleAddCart = (items) => {
        // console.log("add to cart successfully", items)
        const cartData = {
            email: user?.email,
            name: items.name,
            picture: items.picture,
            discount: items.discount,
            price: items.price
        }
        fetch(`http://localhost:5000/addToCart`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(cartData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // refetch()
                toast.success('SuccessFully add to Cart')
            })

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
                            <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white">Details</button></Link>
                        <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white " onClick={() => HandleAddCart(item)}>Add to Cart</button>
                        <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white">Buy Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularItemsCard;