import { RouterProvider } from "react-router-dom"
import { router } from "./Routes/Routes/Routes"
import { BsWhatsapp } from "react-icons/bs";
import '../src/Pages/Home/Home.css'
import ReactWhatsapp from "react-whatsapp";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <div className="lg:w-11/12 md:w-11/12 mx-auto overfl">
      <Toaster />
      <ReactWhatsapp number="+8801827717200" className="whatsapp_float animate-bounce hover:animate-none me-8 print:hidden" message="Hello World!!!" title="Contact with us"><BsWhatsapp className="mx-auto"></BsWhatsapp></ReactWhatsapp>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
