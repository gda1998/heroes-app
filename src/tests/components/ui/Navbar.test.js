import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas en <Navbar />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Gabriel',
            logged: true
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        </AuthContext.Provider>
    );

    beforeEach( () => jest.clearAllMocks() );

    test('El componente debe de mostrarse correctamente', () => {
        const userName = wrapper.find('.text-name').text().trim();
        expect(wrapper).toMatchSnapshot();
        expect(userName).toBe('Gabriel');
    });

    test('Se debe de llamar el logout con el navigate y el dispatch siendo usados en el logout', () => {
        wrapper.find('button').at(1).simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });
        expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
});