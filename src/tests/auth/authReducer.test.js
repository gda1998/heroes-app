import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
    const state = {
        name: 'Gabriel',
        logged: true
    };

    test('Debe de retornar el estado por defecto', () => {
        const action = { type: 'cualquierAction' }
        const resultReducer = authReducer(state, action);
        expect(resultReducer).toEqual(state);
    });

    test('Debe de autenticar y colocar el nombre del usuario', () => {
        const action = {
            type: types.login,
            payload: { name: 'Pablo' }
        };
        const resultReducer = authReducer(state, action);
        expect(resultReducer).toEqual({
            name: 'Pablo',
            logged: true
        })
    });
    
    test('Debe de borrar el nombre del usuario y poner logged en false', () => {
        const action = {
            type: types.logout,
            payload: { logged: false }
        };
        const resultReducer = authReducer(state, action);
        expect(resultReducer.name).toBe(undefined);

    });
    
    
});
