import {useEffect, useState} from "react";

const App = () => {

    const [news, setNews] = useState([])

    useEffect(() => {
        fetch('https://orozking.pythonanywhere.com/api/v1/news/').then(
            res => res.json()
        ).then(res => {
            setNews(res.results)
        })
    }, [])

    return (
        <div className='container py-5'>
            <h1 className='text-center'>Hello world</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {news.map(item =>
                    <div className="card">
                        <img src={item.image} alt="Your Image"/>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
