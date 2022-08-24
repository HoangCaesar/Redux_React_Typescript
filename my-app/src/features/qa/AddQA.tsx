import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import './addQA.scss';
import { qaActions } from './qaSlice';

const AddQA = () => {
    const dispatch = useAppDispatch();

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const [questionError, setQuestionError] = useState(false);
    const [answerError, setAnswerError] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);

    const handleQuestion = (value: string) => {
        setQuestion(value);
        setQuestionError(false);
    };

    const handleAnswer = (value: string) => {
        setAnswer(value);
        setAnswerError(false);
    };

    const handleAdd = async () => {
        if (!question.trim()) {
            setQuestionError(true);
            return;
        } else if (!answer.trim()) {
            setAnswerError(true);
            return;
        }
        const data: string[] = [question, answer];
        setIsProcessing(true);
        setTimeout(() => {
            dispatch(qaActions.add(data));
            setIsProcessing(false);
        }, 500);
        setQuestion('');
        setAnswer('');
    };

    return (
        <div className="add">
            <div className="add_container">
                <div className="add_header">
                    <h4 className="add_header--heading">Create A New Question</h4>
                    <span className="add_header--help">
                        ?
                        <div className="add_header--help--support">
                            You can add questions and answers here
                        </div>
                    </span>
                </div>

                <div className="add_form">
                    <div className="add_form--question">
                        <span className="title">
                            Question
                            {questionError && (
                                <span
                                    style={{ paddingLeft: '10px', color: 'red', fontSize: '20px' }}
                                >
                                    DON'T CHEAT!
                                </span>
                            )}
                        </span>
                        <input
                            value={question}
                            type="text"
                            className="input"
                            onChange={(e) => handleQuestion(e.target.value)}
                        />
                    </div>
                    <div className="add_form--answer">
                        <span className="title">
                            Answer
                            {answerError && (
                                <span
                                    style={{ paddingLeft: '10px', color: 'red', fontSize: '20px' }}
                                >
                                    A QUESTION NEEDS AN ANSWER! DON'T CHEAT!
                                </span>
                            )}
                        </span>
                        <input
                            value={answer}
                            type="text"
                            className="input"
                            onChange={(e) => handleAnswer(e.target.value)}
                        />
                    </div>
                    <button className="add_form--btn" onClick={handleAdd} disabled={isProcessing}>
                        Create Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddQA;
