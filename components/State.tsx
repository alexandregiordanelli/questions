import React, {createContext, useContext, useReducer} from 'react';
import { MainReducer, MainAction, MainState, MainContext } from '../lib/types';
import { userReducer, initialUser } from '../lib/userReducer';

const initialState: MainState = {
    user: initialUser
}

const combineReducers: MainReducer = (state, action) => ({
    user: userReducer(state.user, action),
})

export const StateContext = createContext<MainContext>({} as MainContext);

export const StateProvider: React.FC = props =>(
    <StateContext.Provider value={useReducer<MainReducer>(combineReducers, initialState)}>
        {props.children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);