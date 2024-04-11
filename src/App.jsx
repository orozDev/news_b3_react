import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout.jsx";
import MainPage from "./pages/MainPage.jsx";
import CreateNewsPage from "./pages/CreateNewsPage.jsx";
import DetailNewsPage from "./pages/DetailNewsPage.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path='news/' element={<MainPage />} />
                    <Route path='news/:id/' element={<DetailNewsPage />} />
                    <Route path='create/' element={<CreateNewsPage />} />
                </Route>
                <Route path='*' element={<h2 className='text-center py-5'>404 PAGE NOT FOUND</h2>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default App
