import { useEffect } from "react";
import { useState } from "react";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css';
const OurMoto = () => {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className="hero pt-16 ">
            <div className="hero-content ">
                <div className="text-center   lg:flex mx-auto">
                    <div className="w-[70vw]">
                        <a className="font-serif text-center lg:text-5xl text-4xl font-bold text-fuchsia-700 lg:ms-4 md:ms-4 mx-auto" to="/"><i>Welcome to  <span className="text-pink-700">Hungry Cafe</span></i></a>
                        <p className="py-6 lg:text-center font-bold font-serif lg:mx-16">We are responsible to serve you. Its our Duty.Our every staff is very responsible to their duty. We want to serve our best to you. Your satisfaction is our pride. See the time and select your item for lunch or diner.</p>
                    </div>

                    <div className="lg:w-[30vw] md:w-[10vw] w-[30vw] mx-auto">
                        <Clock value={value} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OurMoto;