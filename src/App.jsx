import { RouterProvider } from "react-router-dom"
import { router } from "./Routes/Routes/Routes"

function App() {


  return (
    <div className="lg:w-11/12 md:w-11/12 mx-auto ">


      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
