import { Reducer } from 'react';
import { UserState, UserAction, UserActionType } from './types';
import firebase from '../lib/firebase-client';

export const initialUser: UserState = {
    currentUser: firebase.auth().currentUser,
    allUsers: []
};

export const userReducer: Reducer<UserState, UserAction> = (state, action) => {
    switch (action.type) {
        case UserActionType.ChangeUser:
            return {
                ...state,
                currentUser: action.value
            };
        case UserActionType.AddUser:
            if(!state.allUsers.some(x => x?.uid)) {
                return {
                    ...state,
                    allUsers: state.allUsers.concat(action.value) 
                };  
            }
        case UserActionType.DeleteUsers:
            return {
                ...state,
                allUsers: []
            };  
        default:
            return state;
    }
};
