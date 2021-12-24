import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas en <LoginScreen />', () => {
    beforeEach( () => jest.clearAllMocks() );
    const contextValue = { dispatch: jest.fn() };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={[ '/login' ]}>
                <Routes>
                    <Route path="/login" element={ <LoginScreen /> } />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de realizar el dispatch y la navegacion', () => {
        wrapper.find('button').simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: { name: 'Gabriel' }
        });
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    test('Debe de usarse la propiedad lastPath de localStorage para redireccionar al usuario', () => {
        localStorage.setItem('lastPath', '/dc');
        wrapper.find('button').simulate('click');
        expect(mockNavigate).toHaveBeenCalledWith('/dc', { replace: true });
    });
});