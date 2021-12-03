import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { heroeImages } from '../../helpers/heroesImages';

export const HeroCard = ({
    id,
    superhero,
    alter_ego,
    first_appearance,
    characters
}) => {
    return (
        <div className="col">
            <div className="card mb-3" style={ {maxWidth: 540} }>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img loading="lazy" src={ heroeImages(id) } className="card-img" alt={ superhero } />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{ superhero }</h5>
                            <p className="card-text">{ alter_ego }</p>
                            
                            { alter_ego !== characters && <p className="card-text">{ characters }</p> }

                            <p className="card-text">
                                <small className="text-muted">{ first_appearance }</small>
                            </p>

                            <Link to={ `./hero/${id}` }>Más...</Link>
                        </div>{/* /.card-body */}
                    </div>{/* /.col-md-8 */}
                </div>{/* /.row .g-0 */}
            </div> {/* /.card .mb-3 */}
        </div> /* /.col */
    )
}

HeroCard.propTypes = {
    id: PropTypes.string.isRequired,
    superhero: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    alter_ego: PropTypes.string.isRequired,
    first_appearance: PropTypes.string.isRequired,
    characters: PropTypes.string.isRequired
};