import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {
    const contextValue = {
        dispatch: jest.fn()
    };

    AuthContext
    const historyMock = {
        replace: jest.fn()
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ historyMock } />
        </AuthContext.Provider>
    );

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de realizar el dispatch y la navegacion', () => {
        wrapper.find('button').simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: { name: 'Gabriel' }
        });
        expect(historyMock.replace).toHaveBeenCalledWith('/');
    });

    test('Debe de usarse la propiedad lastPath de localStorage para redireccionar al usuario', () => {
        localStorage.setItem('lastPath', '/dc');
        wrapper.find('button').simulate('click');
        expect(historyMock.replace).toHaveBeenCalledWith('/dc');
    });
});