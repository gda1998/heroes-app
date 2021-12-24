import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = () => {

    const navigate = useNavigate();
    const { search } = useLocation();

    const { q = '' } = queryString.parse(search);

    const [ form, handleInputChange ] = useForm({
        'searchText' : q
    });

    const { searchText } = form;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`?q=${ searchText }`);
    }

    return (
        <>
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                <div className="col-md-5">
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={ handleSubmit } className="input-group">
                        <input
                            type="text"
                            name="searchText"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />
                        <button 
                            type="submit" 
                            className="btn btn-outline-primary">
                            Button
                        </button>
                    </form>
                </div>
                <div className="col-md-7">
                    <h4>Results</h4>
                    <hr />
                    {
                        (q === '') &&
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                    }
                    {
                        (q !== '' && heroesFiltered.length === 0) &&
                        <div className="alert alert-warning">
                            The hero {q} was not found
                        </div>
                    }
                    {
                        heroesFiltered.map( hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
