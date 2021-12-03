import { heroes } from '../data/heroes';

/**
 * Obtiene un heroe en especifico a partir del ID del mismo
 * 
 * @param  {String} id El ID del heroe
 * @returns  {JSON} EL heroe obtenido
 */
export const getHeroById = (id) => {
    return heroes.find( hero => hero.id === id);
}