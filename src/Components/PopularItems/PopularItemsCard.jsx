
const PopularItemsCard = ({ item }) => {
    return (
        <div>
            <div className="card  bg-gradient-to-r from-base-300 via-base-200 to-base-300 shadow-xl">
                <figure><img src={item.picture} alt="Shoes" className="h-52 w-full" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {item.name}
                        {item.discount > 0 ? <div className="badge badge-secondary py-3">{item.discount}% OFF</div> : ""}
                    </h2>
                    <p>{item.name}</p>
                    <p className="font-bold">Price: ${item.price}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularItemsCard;