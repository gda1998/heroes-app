import { heroes } from '../data/heroes';

/**
 * Obtiene el listado de todos los heroes que pertenezca a DC o Marvel
 * 
 * @param  {String} publisher El publicador del heroe ya sea 'DC Comics' o 'Marvel Comics'
 * @returns {Array<JSON>} El listado de los heroes obtenidos
 */
export const getHeroesByPublisher = (publisher) => {
    // Publicadores permitidos
    const validPublishers = ['DC Comics', 'Marvel Comics'];

    // Validacion de si existe el publicador en el arreglo
    if( !validPublishers.includes(publisher) )
        throw new Error(`Publisher "${publisher}" not found`);

    // Regresa los heroes que sean de DC o Marvel
    return heroes.filter(hero => hero.publisher === publisher);
}
