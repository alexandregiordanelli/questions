import React, {createContext, useContext, useReducer} from 'react';
//import { MainState, MainAction, ActionType, Screen, initialState } from './Models';

export type MainState = {
    value: string
};

export const initialState: MainState = {
    value: ''
};

export enum ActionType {
    ChangeScreen,
    ChangeLocation
}

export type MainAction = {
    type: ActionType;
    value: string;
};


type MainContext = [MainState, React.Dispatch<MainAction>]

export const StateContext = createContext<MainContext>({} as MainContext);

function reducer(state: MainState, action: MainAction) {
    switch (action.type) {
        case ActionType.ChangeScreen:
            return {
                value: action.value
            }
        case ActionType.ChangeLocation:
            return {
                value: action.value
            }
        default:
            return state
    }
}

export const StateProvider: React.FC = props =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {props.children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);