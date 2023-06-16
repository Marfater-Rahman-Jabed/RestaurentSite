import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo.jpg'
const Login = () => {
    return (
        <div>
            <div>
                <div className="hero min-h-screen  bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 lg:py-4">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-fuchsia-1S00">
                        <img src={Logo} alt="" className="rounded-full h-36 w-36 mx-auto mt-2" />
                        <h1 className="text-center text-xl font-serif font-bold"> <span className='text-fuchsia-700'>Login</span> <span className='text-pink-700'>Here</span></h1>
                        <div className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-fuchsia-700 font-bold">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-fuchsia-700 font-bold">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                                <div className="flex justify-between">
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                    <label className="label">
                                        <span className='label-text-alt'>New in hungry cafe ? <Link
                                            to='/register' className="label-text-alt link link-hover">Register</Link></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn  bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;