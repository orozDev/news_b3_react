import baseUrl from "../constance/baseUrl.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import NewsForm from "../components/NewsForm.jsx";


const CreateNewsPage = () => {

    const [errors, setErrors] = useState({})
    const [isFetching, setFetching] = useState(false)


    const navigate = useNavigate()

    const handleForm = e => {
        e.preventDefault()
        setFetching(true)
        const body = new FormData(e.target)
        const token = localStorage.getItem('token')

        fetch(`${baseUrl}/api/v1/news/`, {
            method: 'POST',
            headers: {
                'Authorization':  `Token ${token}`
            },
            body,
        }).then(async (res) => {
            const data = await res.json()
            switch (res.status) {
                case 201:
                    navigate('/news/')
                    break
                case 400:
                    setErrors(data)
                    break
            }
        }).finally(() => setFetching(false))

    }

    return (
        <div>
            <h2>Create News</h2>
            <NewsForm errors={errors} isFetching={isFetching} onSubmit={e => handleForm(e)} />
        </div>
    );
};

export default CreateNewsPage;