import ModalWin from "./ui/ModalWin.jsx";
import {PrimaryInput} from "./ui/inputs.jsx";
import {PrimaryBtn} from "./ui/buttons.jsx";

const SetTokenModalWin = ({isOpen, setOpen}) => {

    const handleFrom = e => {
        e.preventDefault()
        const token = e.target.token.value
        localStorage.setItem('token', token)
        alert('Successfully set!')
        setOpen(false)
    }

    return (
        <ModalWin isOpen={isOpen} setOpen={setOpen}>
            <form onSubmit={e => handleFrom(e)}>
                <div className="flex gap-3">
                    <PrimaryInput type='text' name='token' placeholder='Enter token' required/>
                    <PrimaryBtn>Set</PrimaryBtn>
                </div>
            </form>
        </ModalWin>
    );
};

export default SetTokenModalWin;