import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AddState {
    question: string[];
    answer: string[];
}

const initialState: AddState = {
    question: ['Who are you?'],
    answer: ['Im Hoang'],
};

export const qaSlice = createSlice({
    name: 'qa',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        add: (state, action: PayloadAction<string[]>) => {
            const questionTemp = [action.payload[0]];
            state.question = [...state.question, ...questionTemp];
            const answerTemp = [action.payload[1]];
            state.answer = [...state.answer, ...answerTemp];
        },
        delete: (state, action: PayloadAction<number>) => {
            state.question.splice(action.payload, 1);
            state.answer.splice(action.payload, 1);
        },
        edit: (state, action: PayloadAction<Array<string>>) => {
            const questionTemp = action.payload[0];
            state.question.splice(parseInt(action.payload[2]), 1, questionTemp);
            const answerTemp = action.payload[1];
            state.answer.splice(parseInt(action.payload[2]), 1, answerTemp);
        },
        deleteAll: (state, action: PayloadAction) => {
            state.question = [];
            state.answer = [];
        },
        sort: (state, action: PayloadAction) => {
            // const data: Array<any> = [];
            // state.question.map((question, index) => [
            //     ...data,
            //     [question, state.answer[index]],
            // ]);
            // data.sort();
            // data.map((item, index) => {
            //     state.question = [];
            //     state.question = [...state.question, data[index][0]];
            //     state.answer = [];
            //     state.answer = [...state.answer, data[index][1]];
            // })
        },
    },
});

export const qaActions = qaSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectQuestion = (state: RootState) => state.qa.question;
export const selectAnswer = (state: RootState) => state.qa.answer;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default qaSlice.reducer;
