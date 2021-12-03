import { types } from '../types/types';

// const state = {
//     name: 'Gabriel',
//     logged: true
// };

/**
 * Metodo reducer para login y logout de la app
 * 
 * @param  {JSON} state={}
 * @param  {JSON} action
 * @returns  {JSON}
 */
export const authReducer = ( state = {}, action ) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            };
        case types.logout:
            return {
                logged: false
            };
        default:
            return state;
    }
}
