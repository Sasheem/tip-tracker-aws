// use this function to automate the process of creating context
import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { addBlogPost: (dispatch) => { return () => {} } }
        const boundActions = {};
        
        // each key is an action of the object of actions
        // boundActions[key] === boundActions.addBlogPost(dispatch) on first loop of actions
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }
        return (
            <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>
        );
    };

    return { Context, Provider };
};

