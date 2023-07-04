import { Link } from 'react-router-dom';
import background from '../../assets/Logo/Logo.jpg'
const NotFoundPage = () => {

    return (
        <div >
            <img src={background} alt="" className='h-[80vh] w-[100vw]' />
            <div className='text-center'>
                <h1 className='text-5xl mb-4'>404 : Page Not Found</h1>
                {/* <h1></h1> */}
                <button className='btn btn-sm bg-fuchsia-700 hover:bg-fuchsia-700 text-white'><Link to='/'>Back to Home</Link></button>
            </div>
        </div>
    );
};

export default NotFoundPage;