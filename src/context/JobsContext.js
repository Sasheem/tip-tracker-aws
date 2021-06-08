import createDataContext from './createDataContext'; 
import { API, graphqlOperation } from 'aws-amplify';
import { listJobs } from '../graphql/queries';
import { deleteJob } from '../graphql/mutations';
// reducer
const JobsReducer = (state, action) => {
    switch (action.type) {
        case 'get_jobs':
            return action.payload;
        case 'delete_job':
            return state.filter((shift) => shift.id !== action.payload);
        case 'edit_job':
            return state;
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



export const { Context, Provider } = createDataContext(
    JobsReducer,
    { getJobs, removeJob },
    []
);