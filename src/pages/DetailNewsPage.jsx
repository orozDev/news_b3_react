import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import baseUrl from "../constance/baseUrl.js";
import Loader from "../components/Loader.jsx";

const DetailNewsPage = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [news, setNews] = useState([])
    const [isFetching, setFetching] = useState(true)

    useEffect(() => async () => {
        const res = await fetch(`${baseUrl}/api/v1/news/${id}/`)
        switch (res.status) {
            case 200:
                // eslint-disable-next-line no-case-declarations
                const data = await res.json()
                setNews(data)
                console.log(data)
                break
            case 404:
                navigate('/')
                break
        }
        setFetching(false)
    }, [])

    return (
        <div>
            {isFetching
                ? <div className='flex justify-center lg:col-span-4 md:col-span-3 sm:col-span-3'><Loader/></div>
                : <div>
                    <div className='flex justify-center mb-10'>
                        <img src={news.image} className='lg:w-9/12 w-full overflow-hidden rounded-2xl' alt=""/>
                    </div>
                    <h2 className='text-center'>{news.title} <br/> {news.category_detail.title}</h2>
                    <div className='text-center mb-5'>{news.tags_detail.map(item => <dpan key={item.id}>{item.title}/ </dpan>)}</div>
                    <p className='mb-5'>{news.description}</p>
                    <p className='mb-5' dangerouslySetInnerHTML={{__html: news.content}}></p>
                    <div className="flex justify-between">
                        <div>{new Date(news.created_at).toLocaleString()}</div>
                        <div>{news.author_detail.first_name + ' ' + news.author_detail.last_name}</div>
                    </div>
                </div>

            }
        </div>
    );
};

export default DetailNewsPage;