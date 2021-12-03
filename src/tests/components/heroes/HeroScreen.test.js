import { mount, shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen />', () => {
    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    };

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el componente Redirect si no hay argumentos en la URL', () => {
        const wrapper = mount(
        <MemoryRouter initialEntries={[ '/hero' ]}>
            <HeroScreen history={ historyMock } />
        </MemoryRouter>);
        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('Debe de mostrar un heroe si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={ HeroScreen } />
            </MemoryRouter>
        );
        expect( wrapper.find('.align-items-center').exists() ).toBe(true);
    });

    test('Debe de regresar a la pantalla principal con Push', () => {
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
        wrapper.find('button').simulate('click');
        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();
    });

    test('Debe de regresar a la pantalla principal con goBack', () => {
        const historyMock = {
            length: 3,
            push: jest.fn(),
            goBack: jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
        wrapper.find('button').simulate('click');
        expect(historyMock.goBack).toHaveBeenCalled();
        expect(historyMock.push).not.toHaveBeenCalled();
    });

    test('Debe de llamar al Redirect si el heroe no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spideraaaa']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
        expect( wrapper.text() ).toBe('');
    });
    
});
