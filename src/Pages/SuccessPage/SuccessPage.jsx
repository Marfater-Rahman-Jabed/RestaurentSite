import { Link, useLocation } from 'react-router-dom';
const SuccessPage = () => {
    const location = useLocation()
    console.log(location.search);
    const query = new URLSearchParams(location.search);
    const transectionId = query.get('transectionId');

    // fetch('/paymentSuccess', {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify()

    // }).then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //     })

    return (
        <div className='bg-green-700 pt-10 h-[75vh] flex justify-center  items-center'>
            <div>
                <h1 className='text-center text-white text-xl '>Your Payment is successfull </h1>
                <h1 className='text-center text-white text-xl'>Your Transsection Id: {transectionId} </h1>

                <div className='text-center mt-6'>
                    <button className='btn btn-sm text-center'><Link to='/profile'>Go to profile</Link></button>
                </div>
            </div>

        </div>
    );
};

export default SuccessPage;