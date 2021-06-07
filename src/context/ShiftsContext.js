import createDataContext from './createDataContext'; 
import { API, graphqlOperation } from 'aws-amplify';
import { listShifts } from '../graphql/queries';
import { createShift, deleteShift } from '../graphql/mutations'

// reducer
const shiftsReducer = (state, action) => {
    
    switch (action.type) {
        case 'get_shifts':
            return action.payload;
        // case 'add_shift':
        //     const { id, createdAt, amount, inTime, outTime, hours, job, tags, user } = action.payload;
        //     return [
        //         ...state,
        //         { id, createdAt, amount, inTime, outTime, hours, job, tags, user },
        //     ];
        case 'delete_shift':
            return state.filter((shift) => shift.id !== action.payload);
        // remember .map return an array
        // the inner return stmt refers to the current iteration, essentially replacing the targeted post
        // with the new data from action.payload object
        case 'edit_shift':
            return state.map((shift) => {
                return shift.id === action.payload.id ? action.payload : shift;
                
            })
        default:
            return state;
    }
}

// helper functions
const getShifts = dispatch => {
    return async () => {
        const result = await API.graphql(graphqlOperation(listShifts));
        dispatch({
            type: 'get_shifts',
            payload: result.data.listShifts.items,
        })
    }
};
const addShift = () => {
    // not being used right now
    return (date, amount, inTime, outTime, hours, job, tags, callback) => {
        // prepare data
		const input = {
			createdAt: date,
			amount,
			inTime,
			outTime,
			hours,
			job,
			tags,
		};

        console.log(`Adding Shift: ${date}`);
		// write to backend
		API.graphql(graphqlOperation(createShift, { input }));

        // dispatch({ type: 'add_shift', payload: { input } });
        callback && callback();
    };
}
const removeShift = dispatch => {
    return async (id) => {
        // prepare data
		const input = { id };

        // delete from backend
		await API.graphql(graphqlOperation(deleteShift, { input }));

        dispatch({ type: 'delete_shift', payload: id })
    };
}
const editShift = dispatch => {
    return (id, createdAt, amount, inTime, outTime, hours, job, tags, user, callback) => {
        dispatch({ 
            type: 'edit_shift', 
            payload: { id, createdAt, amount, inTime, outTime, hours, job, tags, user } 
        });
        callback && callback();
    };
}

export const { Context, Provider } = createDataContext(
    shiftsReducer,
    { getShifts, addShift, removeShift, editShift },
    [],
);