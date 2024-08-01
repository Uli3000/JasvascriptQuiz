import { Box, Button, IconButton, Modal, Stack } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { Footer } from "./Footer"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { useQuestionsData } from "../hooks/useQuestionsData"
import { Question } from "./Question"

const styles = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: 'transparent',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
    const reset = useQuestionsStore(state => state.reset)

    const { correct, incorrect } = useQuestionsData()

    const questionInfo = questions[currentQuestion]

    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        questions.every(question => question.userSelectedAnswer !== undefined) ? (setOpenModal(true), confetti()) : setOpenModal(false)
    }, [questions])

    const handleClose = () => setOpenModal(false)
    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>

                {currentQuestion + 1} / {questions.length}

                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />

            <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" sx={styles}><Box sx={{...styles, width: 400,  bgcolor: 'background.paper', height: 'auto'}}>
                    <h2 id="child-modal-title">Has completado el Quiz</h2>
                    <strong id="child-modal-description">{correct >= 7 ? `Gracias por jugar, has ganado con ${correct} respuestas correctas ✅` : `Gracias por jugar, has perdido con ${incorrect} respuestas incorrectas ❌`}</strong>
                    <div style={{marginTop: '8px'}}>
                        <Button color="secondary" sx={{ marginRight: 2 }} onClick={reset}>Resetear Quiz</Button>
                        <Button color="warning" onClick={handleClose}>Cerrar</Button>
                    </div>
                </Box></Modal>
        </>
    )
}