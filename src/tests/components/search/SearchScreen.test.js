import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchSreen />', () => {

    const historyMock = {
        push: jest.fn()
    };

    const getWrapper = (path) => {
        return mount(
            <MemoryRouter initialEntries={[ path ]}>
                <Route 
                    path="/search" 
                    component={ () => <SearchScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );
    }

    beforeEach( () => jest.clearAllMocks() );

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
    
    test('Debe de llamar el push del history', () => {
        const querySeachValue = 'batman';
        const wrapper = getWrapper(`/search?q=${ querySeachValue }`);
        wrapper.find('input').simulate('change', {
            target: { name: 'searchText', value: querySeachValue }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(historyMock.push).toHaveBeenCalledWith(`?q=${ querySeachValue }`)
    });
    
});
