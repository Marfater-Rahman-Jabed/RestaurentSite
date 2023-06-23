import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsBookmarkHeartFill } from "react-icons/bs";
import useAdmin from "../../Hooks/useAdmin";
const ItemsDetailsCard = ({ item }) => {


    const { user } = useContext(AuthContexts)
    const [Admin] = useAdmin(user?.email)
    const HandleAddCart = (items) => {
        console.log(items)
        const cartData = {
            email: user?.email,
            name: items.name,
            picture: items.picture,
            discount: items.discount,
            price: items.price,
            quantity: 1,
            totalPrice: (items.price * 1) - ((items.price * 1) * (items?.discount > 0 ? items?.discount / 100 : 0))
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
    const HandleOrder = (items) => {
        console.log(items)
        const cartData = {
            email: user?.email,
            name: items.name,
            picture: items.picture,
            discount: items.discount,
            price: items.price,
            quantity: 1,
            totalPrice: (items.price * 1) - ((items.price * 1) * (items?.discount > 0 ? items?.discount / 100 : 0))
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
                // toast.success('SuccessFully add to Cart')
            })

    }

    const handlePopular = (item) => {
        console.log(item)
        fetch(`http://localhost:5000/addPopular`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Successfully Added Popular Item')
            })
    }

    // const handleDelete = (id) => {
    //     console.log(id)
    //     fetch(`http://localhost:5000/items/${id}`, {
    //         method: "put"
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //         })

    // }

    return (
        <div>
            <div className="card  bg-gradient-to-r from-base-300 via-base-200 to-base-300 shadow-xl">
                {/* <figure><img src={item.picture} alt="Shoes" className="h-52 w-full" /></figure> */}
                <PhotoProvider >
                    <PhotoView src={item.picture} >
                        <img src={item.picture} alt="" className="h-52 w-full" />
                    </PhotoView>
                </PhotoProvider>
                <div className="card-body">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="card-title">
                                {item.name}

                            </h2>
                            <p>{item.name}</p>
                            <p className="font-bold">Price: ${item.price}</p>
                        </div>
                        <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white " title='Add Popular Item' onClick={() => handlePopular(item)}><BsBookmarkHeartFill className="text-2xl"></BsBookmarkHeartFill></button>
                    </div>
                    <div className="card-actions justify-end">
                        {/* pass the props value with the Link router. as a result i dont need to load data again */}
                        {/* {Admin &&
                            // <div>
                            //     <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white me-1" title='Delete Item' onClick={() => handleDelete(item._id)}><RiDeleteBinLine className="text-2xl"></RiDeleteBinLine></button>

                            // </div>

                        } */}
                        <Link to={`/item/details/${item._id}`} state={{ item }}>
                            <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white"> Details</button></Link>
                        <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white" onClick={() => HandleAddCart(item)}>Add to Cart</button>
                        <button className="badge badge-outline py-4 hover:bg-blue-700 hover:text-white" onClick={() => HandleOrder(item)}><Link to='/checkout'>Buy Product</Link></button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ItemsDetailsCard;