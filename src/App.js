import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Loading from "./components/Loading/Loading";
const RoomDetail = lazy(() => import("./modules/RoomDetail/RoomDetail"))
const SignIn = lazy(() => import("./modules/Auth/SignIn/SignIn"))
const SignUp = lazy(() => import("./modules/Auth/SignUp/SignUp"))
const HomePage = lazy(() => import("./modules/HomePage/HomePage"))
const InfoUser = lazy(() => import("./modules/InfoUser/InfoUser"))
function App() {
  return (
    <Suspense fallback={<div style={{height:"100vh"}}><Loading/></div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/room/:roomId" element={<RoomDetail />} />
            <Route path="/user/:userId" element={<InfoUser />} />

          </Route>

          <Route path="/" element={<AuthLayout />}>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
    // <Loading/>
  );
}

export default App;
