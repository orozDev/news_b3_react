import { motion, AnimatePresence } from 'framer-motion'

// eslint-disable-next-line react/prop-types
const ModalWin = ({ children, size = "sm", isOpen, setOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={'modal_backdrop'}
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.3,
                            duration: 0.3,
                        }}
                        exit={{
                            opacity: 0
                        }}
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        className={"modal_wrapper " + size}
                        initial={{
                            scale: 0
                        }}
                        animate={{
                            scale: 1,
                            transition: {
                                duration: 0.3,
                            }
                        }}
                        exit={{
                            scale: 0,
                            transition: {
                                delay: 0.3,
                                duration: 0.3,
                            }
                        }}
                    >
                        <motion.div
                            className="modal_content"
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.3,
                                duration: 0.3,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                        >{children}</motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ModalWin