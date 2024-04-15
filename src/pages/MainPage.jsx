import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import baseUrl from "../constance/baseUrl.js";
import Loader from "../components/ui/Loader.jsx";
import {PrimaryBtn, PrimaryLinkBtn} from "../components/ui/buttons.jsx";
import SetTokenModalWin from "../components/SetTokenModalWin.jsx";

const MainPage = () => {
    const [news, setNews] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [isFetching, setFetching] = useState(true)

    const handleDeleteBtn = async (id) => {
        const token = localStorage.getItem('token')
        const res = await fetch(`${baseUrl}/api/v1/news/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        if (res.status === 204) {
            // setNews(news.filter(item => item.id !== id))
            // setNews([...news.filter(item => item.id !== id)])
            setNews(prev => prev.filter(item => item.id !== id))
        }
    }


    useEffect(() => {
        fetch(`${baseUrl}/api/v1/news/`).then(
            res => res.json()
        ).then(res => {
            setNews(res.results)
        }).finally(() => setFetching(false))
    }, [])

    return (
        <>
            <div className="flex justify-between mb-10">
                <h2>News List</h2>
                <div>
                    <PrimaryBtn className='mr-3' onClick={() => setOpen(true)}>Set Token</PrimaryBtn>
                    <PrimaryLinkBtn to='/create'>Create news</PrimaryLinkBtn>
                </div>

            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {isFetching
                    ? <div className='flex justify-center lg:col-span-4 md:col-span-3 sm:col-span-3'><Loader/></div>
                    : news.map(item =>
                        <div className="card" key={item.id}>
                            <img src={item.image} alt="Your Image"/>
                            <div>
                                <h2><Link to={`/news/${item.id}/`}>{item.title}</Link></h2>
                                <p>{item.description}</p>
                            </div>
                            <div className="flex justify-end gap-2">
                                <PrimaryBtn onClick={() => handleDeleteBtn(item.id)}><i className="fa-solid fa-trash"></i></PrimaryBtn>
                                <PrimaryLinkBtn to={`/news/${item.id}/update/`}><i className="fa-solid fa-pen-to-square"></i></PrimaryLinkBtn>
                            </div>
                        </div>
                    )
                }
            </div>
            <SetTokenModalWin isOpen={isOpen} setOpen={setOpen} />
        </>
    );
};

export default MainPage;