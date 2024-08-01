import { Button, Stack } from "@mui/material"
import { useQuestionsData } from "../hooks/useQuestionsData"
import { useQuestionsStore } from "../store/questions"
import { RestartAlt } from "@mui/icons-material"

export const Footer = () => {
    const { correct, incorrect, unanswered } = useQuestionsData()
    const reset = useQuestionsStore(state => state.reset)

    return (
        <footer>
            <Stack>
                <h3 style={{marginTop: '12px', marginBottom: '6px'}}>Respuestas:</h3>
                <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
            </Stack>
            <Button color="secondary" variant="outlined" sx={{marginTop: '10px'}} startIcon={<RestartAlt />} onClick={() => reset()}>
                Resetear Quiz
            </Button>
        </footer>
    )
}