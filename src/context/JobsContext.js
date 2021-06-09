import createDataContext from './createDataContext'; 
import { API, graphqlOperation } from 'aws-amplify';
import { listJobs } from '../graphql/queries';
import { createJob, deleteJob, updateJob } from '../graphql/mutations';
// reducer
const JobsReducer = (state, action) => {
    switch (action.type) {
        case 'get_jobs':
            return action.payload;
        case 'delete_job':
            return state.filter((shift) => shift.id !== action.payload);
        // remember .map returns an array
        // the inner return stmt refers to the current iteration, essentially replacing the targeted job
        // with the new data from action.payload object
        case 'edit_job':
            return state.map((jobItem) => {
                return jobItem.id === action.payload.id ? action.payload : jobItem
            })
        default:
            return state;
    }
};

// actions
const getJobs = dispatch => {
    return async () => {
        const result = await API.graphql(graphqlOperation(listJobs));
        dispatch({
            type: 'get_jobs',
            payload: result.data.listJobs.items,
        })
    };
};
const addJob = () => {
    return async (jobTitle, jobWage, storeName, storeAddress, callback) => {
        // prepare data
		const input = {
			jobTitle,
			jobWage: parseFloat(jobWage),
			storeName,
			storeAddress,
		};
        await API.graphql(graphqlOperation(createJob, { input }));
        callback && callback();
    };
};
const removeJob = dispatch => {
    return async (id, callback) => {
        // prepare data
		const input = { id };

        // delete from backend
		await API.graphql(graphqlOperation(deleteJob, { input }));

        dispatch({ type: 'delete_job', payload: id })
        callback && callback();
    }
};
const editJob = dispatch => {
    return async (id, title, wage, name, address, callback) => {
        // prepare data
        const input = {
            id,
            jobTitle: title,
            jobWage: wage,
            storeName: name,
            storeAddress: address
        };
        
        // update in backend
        await API.graphql(graphqlOperation(updateJob, { input }));
        dispatch({ 
            type: 'edit_job', 
            payload: { 
                id, 
                jobTitle: title, 
                jobWage: parseInt(wage), 
                storeName: name, 
                storeAddress: address 
            }
        });
        callback && callback();
    };
};



export const { Context, Provider } = createDataContext(
    JobsReducer,
    { getJobs, addJob, editJob, removeJob },
    []
);