import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar />', () => {
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    };

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

                <Router history={ historyMock }>
                    <Navbar />
                </Router>

            </MemoryRouter>

        </AuthContext.Provider>
    );

    beforeEach( () => jest.clearAllMocks() );

    test('El componente debe de mostrarse correctamente', () => {
        const userName = wrapper.find('.text-name').text().trim();
        expect(wrapper).toMatchSnapshot();
        expect(userName).toBe('Gabriel');
    });

    test('Se debe de hacer un logout correctamente', () => {
        wrapper.find('button').at(1).simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        });
        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    });
    
    
});