import { Link } from 'react-router-dom';

const PaymentCancelPage = () => {

    return (
        <div className='bg-red-700 pt-10 h-[75vh] flex justify-center  items-center'>
            <div>
                <h1 className='text-center text-white text-xl mb-2'>Unfortunately Your Payment Process Is Cancel  </h1>
                <h1 className='text-center text-white text-xl'>Please try again </h1>

                <div className='text-center mt-6'>
                    <button className='btn btn-sm text-center'><Link to='/checkout'>try Again</Link></button>
                </div>
            </div>

        </div>
    );
};

export default PaymentCancelPage;