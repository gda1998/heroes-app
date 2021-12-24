import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas en <SearchSreen />', () => {
    beforeEach( () => jest.clearAllMocks() );

    const getWrapper = (path) => mount(
        <MemoryRouter initialEntries={[ path ]}>
            <SearchScreen />
        </MemoryRouter>
    );

    test('El componente se debe de mostrar correctamente', () => {
        const wrapper = getWrapper('/search');
        const alertInfoElement = wrapper.find('.alert-info').text().trim();

        expect(wrapper).toMatchSnapshot();
        expect(alertInfoElement).toBe('Search a hero');
    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
        const wrapper = getWrapper('/search?q=batman');
        const inputValue = wrapper.find('input').prop('value');
        expect(wrapper).toMatchSnapshot();
        expect(inputValue).toBe('batman');
    });

    test('Debe de mostrar un error si no se encuentra el heroe', () => {
        const wrapper = getWrapper('/search?q=batman123');
        const alertElement = wrapper.find('.alert-warning');
        expect(alertElement.exists()).toBe(true);
    });
     
    test('Debe de llamar al navigate cuando se hace el submit', () => {
        const querySeachValue = 'batman';
        const wrapper = getWrapper(`/search?q=${ querySeachValue }`);
        wrapper.find('input').simulate('change', {
            target: { name: 'searchText', value: querySeachValue }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(mockNavigate).toHaveBeenCalledWith(`?q=${ querySeachValue }`);
    });
});