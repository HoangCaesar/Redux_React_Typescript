import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { qaActions, selectQuestion, selectAnswer } from './qaSlice';
import './showQA.scss';

const AddQA = () => {
    const questions = useAppSelector(selectQuestion);
    console.log(questions);
    const answers = useAppSelector(selectAnswer);
    console.log(answers);
    const dispatch = useAppDispatch();

    const [showAnswer, setShowAnswer] = useState(false);

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleQuestionEdit = (e: any) => {
        setQuestion(e.target.value);
    };

    const handleAnswerEdit = (e: any) => {
        setAnswer(e.target.value);
    };

    const handleAnswer = () => {
        setShowAnswer(true);
    };

    const handleDelete = (e: any, index: number) => {
        setTimeout(() => {
            dispatch(qaActions.delete(index));
        }, 500);
    };

    const handleEdit = (e: any, index: number) => {
        let newIndex = index.toString();
        if (!question.trim() && !answer.trim()) {
            return;
        } 
        const data: Array<string> = [question, answer, newIndex];
        setIsProcessing(true);
        setTimeout(() => {
            dispatch(qaActions.edit(data));
            setIsProcessing(false);
        }, 500);
        setQuestion('');
        setAnswer('');
    };

    // Handle delete all + sort

    const handleRemove = () => {
        setIsProcessing(true);
        setTimeout(() => {
            dispatch(qaActions.deleteAll());
            setIsProcessing(false);
        }, 500);
    };

    const handleSort = () => {
        setIsProcessing(true);
        setTimeout(() => {
            dispatch(qaActions.sort());
            setIsProcessing(false);
        }, 500);
    };

    return (
        <div className="show">
            <div className="show_container">
                <div className="show_header">
                    <h4 className="show_header--heading">Created Questions</h4>
                    <span className="show_header--help">
                        ?
                        <div className="show_header--help--support">
                            You can find created questions and answers here
                        </div>
                    </span>
                </div>

                <div className="show_form">
                    <div className="show_form--question">
                        <span className="title">Question</span>
                        {!!questions ? (
                            questions.map((question, index) => (
                                <div key={index} style={{ margin: '10px 0 20px 0' }}>
                                    <input
                                        onClick={handleAnswer}
                                        onChange={(e: any) => handleQuestionEdit(e)}
                                        defaultValue={`A: ${questions[index]}`}
                                        name="text"
                                        readOnly={false}
                                        className="input"
                                    />
                                    {showAnswer && (
                                        <input
                                            onClick={handleAnswer}
                                            defaultValue={`Q: ${answers[index]}`}
                                            onChange={(e: any) => handleAnswerEdit(e)}
                                            name="text"
                                            className="input"
                                        />
                                    )}
                                    {/* <div className="show_btn" id={question[index]}> */}
                                    <button
                                        onClick={(e) => handleEdit(e, index)}
                                        disabled={isProcessing}
                                        className="show_btn--editBtn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, index)}
                                        disabled={isProcessing}
                                        className="show_btn--deleteBtn"
                                    >
                                        Delete
                                    </button>
                                    {/* </div> */}
                                </div>
                            ))
                        ) : (
                            <h1>Sorry, we don't have any questions now. Please add one.</h1>
                        )}
                    </div>
                    <div className="show_btn">
                        <button
                            className="show_form--sortBtn"
                            disabled={isProcessing}
                            onClick={handleSort}
                        >
                            Sort Questions (Alphabetical)
                        </button>
                        <button
                            className="show_form--removeBtn"
                            disabled={isProcessing}
                            onClick={handleRemove}
                        >
                            Remove All Questions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQA;
