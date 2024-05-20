import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Users from "./Users";
import Signup from "./Signup";
import Signin from "./Signin";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import IntroPage from "./IntroPage";
import CreateQuery from './CreateQuery'
import MyQueries from './MyQueries'
import Menu from "./Menu";
import ViewQuery from "./ViewQuery";
import AddUser from "./AddUser";
import Assign from "./Assign";
import ForgotPassword from "./ForgotPassword";
import OTP from "./OTP";
import ChangePassword from "./ChangePassword";
import AssignedQueries from "./AssignedQueries";
import './Home.css'

const MainRouter = () => {
    return (
        <div>
            <Menu />

            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/IntroPage' element={<IntroPage />} />
                <Route path='/CreateQuery/:userId' element={<CreateQuery />} />
                <Route path='/queries/:userId' element={<MyQueries />} />
                <Route path='/user/:userId' element={<Profile />} />
                <Route path='/query/:queryId' element={<ViewQuery />} />
                <Route path='/user/edit/:userId' element={<EditProfile />} />
                <Route path='/addUser' element={<AddUser />} />
                <Route path='/assign/:queryId' element={<Assign />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/otp/:userId' element={<OTP />} />
                <Route path='/changePassword/:userId' element={<ChangePassword />} />
                <Route path='/assignedQueries' element={<AssignedQueries />} />
            </Routes>

        </div>
    );
}

export default MainRouter;
