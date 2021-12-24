import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { getHeroById } from '../../selectors/getHeroById';
import { heroeImages } from '../../helpers/heroesImages';

export const HeroScreen = () => {
    const { heroId } = useParams();
    const navigate = useNavigate();
    const hero = useMemo(() => getHeroById(heroId), [ heroId ]);
    const handleReturn = () => navigate(-1) === undefined && navigate('/');

    if(!hero) return <Navigate to="/" />

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="d-flex align-items-center animate__animated animate__fadeInLeft">
            {/* {
                console.log(heroeImages(heroId))
            } */}
            <div className="flex-shrink-0">
                <img loading="lazy" src={ heroeImages(heroId) } className="img-thumbnail" alt={superhero} />
            </div>
            <div className="flex-grow-1 ms-3">
                <h3>{ superhero }</h3>
                <div className="d-flex align-items-start flex-column bd-highlight mb-3" >
                    <div className="p-2 bd-highlight"><b>Alter Ego:</b> { alter_ego }</div>
                    <div className="p-2 bd-highlight"><b>Publisher:</b> { publisher }</div>
                    <div className="p-2 bd-highlight"><b>First appearance:</b> { first_appearance }</div>
                </div>
                <h5>Characters</h5>
                <p>{ characters }</p>
                <button className="btn btn-outline-info" onClick={ handleReturn }>Return</button>
            </div>
        </div>
    );
}
