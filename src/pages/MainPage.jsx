import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import baseUrl from "../constance/baseUrl.js";
import Loader from "../components/Loader.jsx";

const MainPage = () => {
    const [news, setNews] = useState([])
    const [isFetching, setFetching] = useState(true)

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
                    <Link className='primary-btn' to='/create'>Create news</Link>
                </div>

            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {isFetching
                    ? <div className='flex justify-center lg:col-span-4 md:col-span-3 sm:col-span-3'><Loader /></div>
                    : news.map(item =>
                        <div className="card" key={item.id}>
                            <img src={item.image} alt="Your Image"/>
                            <h2><Link to={`news/${item.id}/`}>{item.title}</Link></h2>
                            <p>{item.description}</p>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default MainPage;