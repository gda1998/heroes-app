import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Pruebas en <DashboardRoutes />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Gabriel',
            logged: true
        }
    };

    // beforeEach( () => {
    //     jest.clearAllMocks();
    // });

    test('Debe de mostrarse correctamente', () => {
        const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
                <DashboardRoutes />
            </MemoryRouter>
        </AuthContext.Provider>);
        const userName = wrapper.find('.text-name').text().trim();
        expect(wrapper).toMatchSnapshot();
        expect(userName).toBe('Gabriel');
    });
});