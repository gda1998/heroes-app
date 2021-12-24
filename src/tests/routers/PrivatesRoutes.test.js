import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { PrivateRoutes } from '../../routers/PrivateRoutes';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aquí</span>
}));

describe('Pruebas en <PrivateRoute />', () => {
    beforeEach( () => jest.clearAllMocks() );
    Storage.prototype.setItem = jest.fn();

    const getWrapper = (contextValue) => mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={[ '/marvel' ]}>
                <PrivateRoutes>
                    <h1>Private Component</h1>
                </PrivateRoutes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('Debe de mostrar el componente si esta autenticado y guarda en localStorage', () => {
        const contextValue = {
            user: {
                name: 'Gabriel',
                logged: true
            }
        };
        const wrapper = getWrapper(contextValue);
        expect( wrapper.find('h1').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    });

    test('Debe de bloquear el componente si no está autenticado', () => {
        const contextValue = {
            user: { logged: false }
        };
        const wrapper = getWrapper(contextValue);
        expect( wrapper.find('span').exists() ).toBe(true);
        expect( wrapper.find('span').text().trim() ).toBe('Saliendo de aquí');
    });
});
