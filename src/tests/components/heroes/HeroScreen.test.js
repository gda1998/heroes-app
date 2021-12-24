import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen />', () => {
    beforeEach( () => jest.clearAllMocks() );

    const getWrapper = (heroId) => mount(
        <MemoryRouter initialEntries={[ `/hero/${heroId}` ]}>
            <Routes>
                <Route path="/hero/:heroId" element={ <HeroScreen /> } />
                <Route path="/" element={ <h1>Not Found</h1>} />
            </Routes>
        </MemoryRouter>
    );

    test('Debe de redireccionar a la pantalla de Marvel si no existe el heroe a buscar', () => {
        const wrapper = getWrapper('super-hombre');
        const existsMarvelTitle = wrapper.find('h1').exists();
        expect(existsMarvelTitle).toBe(true);
    });

    test('Debe de mostrar a Spiderman cuando el parametro exista', () => {
        const wrapper = getWrapper('marvel-spider');
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h3').exists()).toBe(true);
        expect( wrapper.find('h3').text().trim() ).toBe('Spider Man');
    });
});
