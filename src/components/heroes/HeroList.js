import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';


export const HeroList = ({ publisher }) => {
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [ publisher ]);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 animate__animated animate__fadeIn">
            {
                heroes.map( hero => <HeroCard key={hero.id} {...hero} /> )
            }
        </div>
    );
}

HeroList.propTypes = {
    publisher: PropTypes.string.isRequired
};