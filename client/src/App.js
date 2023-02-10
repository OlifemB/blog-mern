import Container from "@mui/material/Container";

import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login, Tags, Test} from "./pages";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAuth, selectIsAuth} from "./redux/user";

export const App = () => {
    const dispatch = useDispatch()
    const userData = useSelector(store => store.user.data)


    useEffect(() => {
        dispatch(fetchAuth())
    }, [])

    return (
        <>
            <Header/>

            <Container>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/posts/:id" element={<FullPost/>}/>
                    <Route path="/posts/:id/edit" element={<AddPost/>}/>
                    <Route path="/add-post" element={<AddPost/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/tags/:id" element={<Tags/>}/>
                    <Route path="/test" element={<Test/>}/>
                </Routes>
            </Container>
        </>
    );
}
