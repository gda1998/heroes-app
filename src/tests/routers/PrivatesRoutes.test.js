import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { PrivateRoutes } from '../../routers/PrivateRoutes';

describe('Pruebas en <PrivateRoute />', () => {
    const props = {
        location: { pathname: '/marvel' }
    }
    Storage.prototype.setItem = jest.fn();

    test('Debe de mostrar el componente si esta autenticado y guarda en localStorage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoutes
                    isAuthenticated={ true }
                    component={ () => <span>Componente a mostrar</span> }
                    { ...props }
                />
            </MemoryRouter>
        );
        expect( wrapper.find('span').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    });

    test('Debe de bloquear el componente si no está autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoutes 
                    isAuthenticated={ false }
                    component={ () => <span>Componente a mostrar</span> }
                    { ...props }
                />
            </MemoryRouter>
        );
        expect( wrapper.find('span').exists() ).toBe(false);
    });
    
});
