import { create } from "zustand";
import { type Question } from "../types";
import confetti from 'canvas-confetti'
import { persist } from "zustand/middleware";

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => void
    selectAnswer: (questionId: number, answerIndex: number) => void,
    goNextQuestion: () => void,
    goPreviousQuestion: () => void,
    reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            const newQuestions = structuredClone(questions)
            // Encontrar indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // Informacion de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // Comprobar si la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

            if (isCorrectUserAnswer) confetti()

            // Cambiar la informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            // Actualizar el estado
            set({ questions: newQuestions })
        },
        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length)
                set({ currentQuestion: nextQuestion })
        },
        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if (previousQuestion >= 0)
                set({ currentQuestion: previousQuestion })
        },
        reset: () => {
            set({ currentQuestion: 0, questions: [] })
        }
    }
}, {
    name: 'questions',
    // Por defecto guarda en el localstorage, se puede cambiar con el getStorage
}))