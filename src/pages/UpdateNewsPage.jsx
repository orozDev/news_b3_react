import baseUrl from "../constance/baseUrl.js";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NewsForm from "../components/NewsForm.jsx";
import Loader from "../components/ui/Loader.jsx";

const UpdateNewsPage = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [news, setNews] = useState({})
    const [errors, setErrors] = useState({})
    const [isFetching, setFetching] = useState(true)

    useEffect(() => async () => {
        const res = await fetch(`${baseUrl}/api/v1/news/${id}/`)
        switch (res.status) {
            case 200:
                // eslint-disable-next-line no-case-declarations
                const data = await res.json()
                setNews(data)
                break
            case 404:
                navigate('/')
                break
        }
        setFetching(false)
    }, [])

    const handleForm = async (e) => {
        e.preventDefault()
        setFetching(true)
        const form = e.target
        const body = new FormData(form)

        if (form.image.files.length === 0) {
            body.delete('image')
        }

        const token = localStorage.getItem('token')
        const res = await fetch(`${baseUrl}/api/v1/news/${id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${token}`
            },
            body,
        })
        const data = await res.json()
        switch (res.status) {
            case 200:
                navigate('/')
                break
            case 400:
                setErrors(data)
                break
        }
        setFetching(false)
    }

    return (
        <div>
            <div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h2>Update the News "{news?.title}"</h2>
                {isFetching
                    ? <div className='flex justify-center lg:col-span-4 md:col-span-3 sm:col-span-3'><Loader/></div>
                    : <NewsForm errors={errors} buttonTitle='Save' value={news} isFetching={isFetching} onSubmit={e => handleForm(e)}/>
                }

            </div>
        </div>
    );
};

export default UpdateNewsPage;