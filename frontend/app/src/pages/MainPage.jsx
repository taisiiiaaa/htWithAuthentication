import React, { useEffect, useRef, useState } from 'react'
import './MainPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { addHabitThunk, deleteHabitThunk, editHabitThunk, getHabitsThunk, markAsCompleteThunk } from '../store/habitsSlice';

export default function MainPage() {
    const dispatch = useDispatch();
    const { habits }= useSelector(state => state.habits);

    const [isFormShown, setIsFormShown] = useState(false);
    const [habitIdToEdit, setHabitIdToEdit] = useState(null);

    const titleRef = useRef();

    useEffect(() => {
        dispatch(getHabitsThunk());
    }, [dispatch]);

    const handleAddHabit = () => {
        if (habitIdToEdit !== null) {
            dispatch(editHabitThunk({
            id: habitIdToEdit,
            title: titleRef.current.value,
            completed: false 
            }));
        } else {
            dispatch(addHabitThunk({
            title: titleRef.current.value,
            completed: false
            }));
        }

        setIsFormShown(false);
        setHabitIdToEdit(null);
        titleRef.current.value = '';
    }

    const handleDelete = habitId => {
        dispatch(deleteHabitThunk(habitId));
    }

    const handleEdit = habitId => {
        setIsFormShown(true);
        const habitToEdit = habits.find(habit => habit.id === habitId);

        if (!habitToEdit) {
            return;
        }

        setIsFormShown(true);
        setHabitIdToEdit(habitId);
        setTimeout(() => {
            titleRef.current.value = habitToEdit.title;
        }, 0);
    }

    const handleMarkAsComplete = habitId => {
        dispatch(markAsCompleteThunk(habitId));
    }

    return (
        <div className='main-page'>
            <h1>Habit Tracker</h1>
            <button type='button' onClick={() => setIsFormShown(prev => !prev)}>
                {isFormShown ? 'Close Form' : 'Add Habit'}
            </button>
            {isFormShown && 
                <form>
                    <label htmlFor='habit'>Enter new habit</label>
                    <input type='text' placeholder='e.g. everyday morning jogging' ref={titleRef} name='habit' />
                    <button type='button' onClick={handleAddHabit}>{habitIdToEdit ? 'Save' : 'Add'}</button>
                </form>
            }
            <h3>Habits to track this week</h3>
            <ul>
                {habits.map(habit => (
                    <li key={habit.id}>
                        <p className={`${habit.completed ? 'completed' : ''}`}>{habit.title}</p>
                        <button type='button' onClick={() => handleMarkAsComplete(habit.id)} className='actions'>{habit.completed ? 'Completed' : 'Mark as complete'}</button>
                        <button type='button' onClick={() => handleEdit(habit.id)} className='actions'>Edit</button>
                        <button type='button' onClick={() => handleDelete(habit.id)} className='actions'>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
