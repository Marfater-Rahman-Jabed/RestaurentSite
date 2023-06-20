import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo.jpg'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContexts } from '../../Contexts/Contexts';
import Loading from '../../Components/Loading/Loading';
import { toast } from 'react-hot-toast';
const Register = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { createUser, loading, setLoading, updateUser } = useContext(AuthContexts)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const onsubmit = data => {
        console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const profile = {
                    displayName: data.name
                }
                updateUser(profile)
                    .then(result => {
                        // console.log(result)
                        saveUser(data)
                    })
                    .catch(error => console.log(error))

                toast.success('Register successfully');
                navigate(from, { replace: true });
                setLoading(false)


            })
            .catch(error => console.log(error))

    }

    const saveUser = (data) => {

        const details = {
            userName: data.name,
            email: data.email,

        }

        fetch(`http://localhost:5000/addUser`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
    }


    return (
        <div>
            <div className="hero min-h-screen  bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 lg:py-4">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-fuchsia-1S00">
                    <img src={Logo} alt="" className="rounded-full h-32 w-32 mx-auto mt-2" />
                    <h1 className="text-center text-xl font-serif font-bold"> <span className='text-fuchsia-700'>Register</span> <span className='text-pink-700'>Here</span></h1>
                    <div className="card-body pt-0">
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-fuchsia-700 font-bold">Name</span>
                                </label>
                                <input type="text" placeholder="Name" {...register('name')} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-fuchsia-700 font-bold">Email</span>
                                </label>
                                <input type="text" placeholder="Email" {...register('email')} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-fuchsia-700 font-bold">Password</span>
                                </label>
                                <input type="password" placeholder="Password" {...register('password')} className="input input-bordered" required />
                                <label className="label">
                                    <span className='label-text-alt'>Already have an account ? <Link
                                        to='/login' className="label-text-alt link link-hover">Login</Link></span>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <button className="btn  bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white">{loading ? <Loading></Loading> : "Register"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Register;