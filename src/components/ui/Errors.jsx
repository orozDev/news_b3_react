// eslint-disable-next-line react/prop-types
const Errors = ({className='', errors = []}) => {
    return (
        <div className={`text-red-600 ${className}`}>
            {errors.map((item, idx) =>
                <div className='mb-3' key={idx}>{item}</div>
            )}
        </div>
    );
};

export default Errors;