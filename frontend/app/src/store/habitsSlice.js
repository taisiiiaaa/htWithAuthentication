import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    habits: []
}

export const getHabitsThunk = createAsyncThunk('habits/get', async () => {
  const response = await fetch('http://localhost:3000/api/habits');
  const data = await response.json();
  return data;
});

export const addHabitThunk = createAsyncThunk('habits/add', async (habit) => {
  const response = await fetch('http://localhost:3000/api/habits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ habit })
  });
  const data = await response.json();
  return data.habit;
});

export const deleteHabitThunk = createAsyncThunk('/habits/delete', async (habitId) => {
    const response = await fetch(`http://localhost:3000/api/habits/${habitId}`, {
      method: 'DELETE'
    });

    return habitId;
});

export const editHabitThunk = createAsyncThunk('habits/edit', async ({ id, title, completed }, thunkAPI) => {
    const response = await fetch(`http://localhost:3000/api/habits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, completed })
    });

    const data = await response.json();
    return data.habit;
  }
);

export const markAsCompleteThunk = createAsyncThunk('habits/complete', async (habitId, { getState }) => {
    const state = getState();
    const habit = state.habits.habits.find(h => h.id === habitId);

    const updatedHabit = { completed: !habit.completed };

    const res = await fetch(`http://localhost:3000/api/habits/${habitId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHabit)
    });
    const data = await res.json();
    return data.habit;
  }
);


const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getHabitsThunk.fulfilled, (state, action) => {
        state.habits = action.payload;
        })
        .addCase(addHabitThunk.fulfilled, (state, action) => {
        state.habits.push(action.payload);
        })
        builder.addCase(deleteHabitThunk.fulfilled, (state, action) => {
          state.habits = state.habits.filter(habit => habit.id !== action.payload);
        });   
        builder.addCase(editHabitThunk.fulfilled, (state, action) => {
          const updatedHabit = action.payload;
          const index = state.habits.findIndex(h => h.id === updatedHabit.id);
          if (index !== -1) {
              state.habits[index] = updatedHabit;
          }
        });
        builder.addCase(markAsCompleteThunk.fulfilled, (state, action) => {
          const updatedHabit = action.payload;
          const index = state.habits.findIndex(habit => habit.id === updatedHabit.id);
          if (index !== -1) {
            state.habits[index] = updatedHabit;
          }
        });
}});

export default habitsSlice.reducer;