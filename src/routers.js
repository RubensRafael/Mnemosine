import { React } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Landing from './aware-components/landing';
import Dashboard from './aware-components/dashboard';



function Routers(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing/>}></Route>
                <Route path='dashboard' element={<Dashboard/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;