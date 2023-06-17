import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo.jpg'
import { useEffect } from 'react';
const Register = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <div className="hero min-h-screen  bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 lg:py-4">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-fuchsia-1S00">
                    <img src={Logo} alt="" className="rounded-full h-32 w-32 mx-auto mt-2" />
                    <h1 className="text-center text-xl font-serif font-bold"> <span className='text-fuchsia-700'>Register</span> <span className='text-pink-700'>Here</span></h1>
                    <div className="card-body pt-0">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-fuchsia-700 font-bold">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-fuchsia-700 font-bold">Email</span>
                            </label>
                            <input type="text" placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-fuchsia-700 font-bold">Password</span>
                            </label>
                            <input type="text" placeholder="Password" className="input input-bordered" />
                            <label className="label">
                                <span className='label-text-alt'>Already have an account ? <Link
                                    to='/login' className="label-text-alt link link-hover">Login</Link></span>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <button className="btn  bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Register;