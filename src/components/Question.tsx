import { type Question as QuestionType } from "../types"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import { getBackgroundColor } from "../services/utils"

export const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 2 }}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={tomorrowNightEighties} >
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} divider>
                        <ListItemButton disabled={info.userSelectedAnswer != null} onClick={createHandleClick(index)}
                            sx={{ backgroundColor: getBackgroundColor(info, index) }}
                        >
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    )
}