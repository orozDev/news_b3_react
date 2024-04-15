import {PrimaryFetchSelect, PrimaryInput, PrimaryTextArea} from "./ui/inputs.jsx";
import Errors from "./ui/Errors.jsx";
import baseUrl from "../constance/baseUrl.js";
import {PrimaryFetchBtn} from "./ui/buttons.jsx";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const NewsForm = ({className = '', errors = {}, buttonTitle = 'Create', isFetching = false, value = {}, ...props}) => {

    const [news, setNews] = useState(value)

    return (
        <form className={className} {...props}>
            <div className="mb-5">
                <PrimaryInput type='text' name='slug' placeholder='Enter slug'
                              value={news?.slug} onChange={e => setNews({...news, slug: e.target.value})}/>
                <Errors errors={errors?.slug || []}/>
            </div>
            <div className="mb-5">
                <PrimaryInput type='text' name='title' placeholder='Enter title' value={news?.title}
                              onChange={e => setNews({...news, title: e.target.value})}/>
                <Errors errors={errors?.title || []}/>
            </div>
            <div className="mb-5">
                <PrimaryInput type='file' name='image'/>
                <Errors errors={errors?.image || []}/>
            </div>
            <div className="mb-5">
                <PrimaryTextArea type='text' rows='10' name='description' placeholder='Enter description'
                                 value={news?.description}
                                 onChange={e => setNews({...news, description: e.target.value})}/>
                <Errors errors={errors?.description || []}/>
            </div>
            <div className="mb-5">
                <PrimaryTextArea type='text' rows='10' name='content' placeholder='Enter content' value={news?.content}
                                 onChange={e => setNews({...news, content: e.target.value})}/>
                <Errors errors={errors?.content || []}/>
            </div>
            <div className="mb-5 flex gap-3">
                <input type="checkbox" id='checkbox_is_published' name='is_published' checked={news.is_published}
                       onChange={() => {
                           setNews({...news, is_published: !news.is_published})
                       }}/>
                <label htmlFor="checkbox_is_published">Is Published</label>
                <Errors errors={errors?.is_published || []}/>
            </div>
            <div className="mb-5">
                <PrimaryFetchSelect name='category' url={`${baseUrl}/api/v1/categories/`} value={news?.category}
                                    onChange={e => setNews({...news, category: e.target.value})}/>
                <Errors errors={errors?.category || []}/>
            </div>
            <div className="mb-5">
                <PrimaryFetchSelect
                    name='tags'
                    multiple={true}
                    url={`${baseUrl}/api/v1/tags/`}
                    value={news?.tags}
                    onChange={e => {
                        const selectInput = e.target
                        const tags = [...selectInput.selectedOptions].map(option => +option.value)
                        setNews({...news, tags})
                    }}
                />
                <Errors errors={errors?.tags || []}/>
            </div>
            <div>
                <PrimaryFetchBtn isFetching={isFetching} type='submit' className='block w-full'>{buttonTitle}</PrimaryFetchBtn>
            </div>
        </form>
    );
};

export default NewsForm;