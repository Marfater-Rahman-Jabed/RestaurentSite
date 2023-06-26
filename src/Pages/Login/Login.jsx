import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo.jpg'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContexts } from '../../Contexts/Contexts';
import Loading from '../../Components/Loading/Loading';
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { LogIn, loading, setLoading, googleLogIn, forgotPass, verificationEmail } = useContext(AuthContexts);
    const [userEmail, setUserEmail] = useState(null)
    const [verify, setverify] = useState('')
    const [error, setError] = useState('')
    // console.log(userEmail)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const onsubmit = data => {
        console.log(data.email)
        LogIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user?.emailVerified) {
                    console.log(user)
                    toast.success('Successfully Login !!!')
                    navigate(from, { replace: true })
                    setLoading(false)
                }
                else {
                    console.log(user)
                    setverify('verify')
                    toast.error('Please Verified Your Email')
                    setLoading(false)
                }


            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                setError(error.message)
            })
    }

    const handleGoogle = () => {
        googleLogIn()
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true })
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleForgot = () => {
        forgotPass(userEmail)
            .then(() => {
                toast.success("Check Your Email for set New PassWord")
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                toast.error('Please provide Valid Email Address')
            })
    }

    const handleVerification = () => {
        verificationEmail()
            .then(() => {
                toast.success(' Resend varification Email. Please Click the given Link')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="hero min-h-screen  bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 lg:py-4">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-fuchsia-1S00">
                    <img src={Logo} alt="" className="rounded-full h-32 w-32 mx-auto mt-2" />
                    <h1 className="text-center text-xl font-serif font-bold"> <span className='text-fuchsia-700'>Login</span> <span className='text-pink-700'>Here</span></h1>
                    <div className="card-body pt-0">
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-fuchsia-700 font-bold">Email</span>
                                </label>
                                <input type="text" placeholder="Email" {...register('email')} onBlur={(event) => setUserEmail(event.target.value)} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-fuchsia-700 font-bold">Password</span>
                                </label>
                                <input type="password" placeholder="Password" {...register('password')} className="input input-bordered" required />
                                <div className="flex justify-between">
                                    <button className="label" onClick={handleForgot}>
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </button>
                                    <label className="label">
                                        <span className='label-text-alt'>New in hungry cafe ? <Link
                                            to='/register' className="label-text-alt link link-hover">Register</Link></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                {
                                    verify && <button className='btn btn-sm bg-red-500 text-white hover:bg-red-600' onClick={handleVerification}>Resend Verification Mail</button>
                                }
                                {
                                    error && <h1 className='text-center mb-2 text-red-600'>{error.split('/')[1].slice(0, -2)}</h1>
                                }
                                <button className="btn  bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white">{loading ? <Loading></Loading> : 'Login'}</button>
                                <div className="divider">OR</div>

                            </div>
                        </form>
                        <button className="btn  btn-outline hover:bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700 " onClick={handleGoogle}>{<><FcGoogle className='text-3xl '></FcGoogle> <h1>Contnue With Google</h1></>}</button>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;