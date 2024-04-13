import {PrimaryFetchSelect, PrimaryInput, PrimaryTextArea} from "../components/ui/inputs";
import baseUrl from "../constance/baseUrl.js";
import {PrimaryFetchBtn} from "../components/ui/buttons";
import {useState} from "react";
import Errors from "../components/ui/Errors.jsx";
import {useNavigate} from "react-router-dom";


const CreateNewsPage = () => {

    const [errors, setErrors] = useState({})
    const [isFetching, setFetching] = useState(false)


    const navigate = useNavigate()

    const handleForm = e => {
        e.preventDefault()
        setFetching(true)
        const formData = new FormData(e.target)
        const token = localStorage.getItem('token')

        fetch(`${baseUrl}/api/v1/news/`, {
            method: 'POST',
            headers: {
                'Authorization':  `Token ${token}`
            },
            body: formData
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
            <form onSubmit={e => handleForm(e)}>
                <div className="mb-5">
                    <PrimaryInput type='text' name='slug' placeholder='Enter slug' />
                    <Errors errors={errors?.slug || []} />
                </div>
                <div className="mb-5">
                    <PrimaryInput type='text' name='title' placeholder='Enter title' />
                    <Errors errors={errors?.title || []} />
                </div>
                <div className="mb-5">
                    <PrimaryInput type='file' name='image' />
                    <Errors errors={errors?.image || []} />
                </div>
                <div className="mb-5">
                    <PrimaryTextArea type='text' rows='10' name='description' placeholder='Enter description' />
                    <Errors errors={errors?.description || []} />
                </div>
                <div className="mb-5">
                    <PrimaryTextArea type='text' rows='10' name='content' placeholder='Enter content' />
                    <Errors errors={errors?.content || []} />
                </div>
                <div className="mb-5 flex gap-3">
                    <input type="checkbox" id='checkbox_is_published' name='is_published' />
                    <label htmlFor="checkbox_is_published">Is Published</label>
                    <Errors errors={errors?.is_published || []} />
                </div>
                <div className="mb-5">
                    <PrimaryFetchSelect name='category' url={`${baseUrl}/api/v1/categories/`} />
                    <Errors errors={errors?.category || []} />
                </div>
                <div className="mb-5">
                    <PrimaryFetchSelect name='tags' multiple={true} url={`${baseUrl}/api/v1/tags/`} />
                    <Errors errors={errors?.tags || []} />
                </div>
                <div>
                    <PrimaryFetchBtn isFetching={isFetching} type='submit' className='block w-full'>Create</PrimaryFetchBtn>
                </div>
            </form>
        </div>
    );
};

export default CreateNewsPage;