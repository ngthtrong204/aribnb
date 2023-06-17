import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";

const SignIn = lazy(() => import("./modules/Auth/SignIn/SignIn"))
const SignUp = lazy(() => import("./modules/Auth/SignUp/SignUp"))
const HomePage = lazy(() => import("./modules/HomePage/HomePage"))
function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />

          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
