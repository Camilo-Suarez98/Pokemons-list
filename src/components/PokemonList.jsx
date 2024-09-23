import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/queries';
import { Link } from 'react-router-dom';

import Loader from './Loader';
import './PokemonList.css';

const PokemonList = () => {
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data } = useQuery(GET_POKEMONS);
  const pokemons = data.pokemon_v2_pokemon;

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;


  const sortPokemons = (a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'id') {
      return a.id - b.id;
    }
    return 0;
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPokemons = [...filteredPokemons].sort(sortPokemons);

  return (
    <div>
      <h1><img src='/pokeball.png' alt="Pokemon logo" /> Pokédex</h1>
      <div>
        <div className='input-search-container'>
          <img className='input-search' src='/search.png' alt="Search Image" />
          <input
            type="text"
            className='input-bar'
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label>Sort by:</label>
          <div>
            <input
              type="radio"
              id="name"
              name="sortBy"
              value="name"
              checked={sortBy === 'name'}
              onChange={(e) => setSortBy(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input
              type="radio"
              id="id"
              name="sortBy"
              value="id"
              checked={sortBy === 'id'}
              onChange={(e) => setSortBy(e.target.value)}
            />
            <label htmlFor="id">Number</label>
          </div>
        </div>
      </div>

      <ul className='pokemons-list'>
        {
          sortedPokemons.map((pokemon) => (
            <li className='pokemon-card' key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.id}`}>
                <p className='pokemon-number'>#{pokemon.id.toString().padStart(3, '0')}</p>
                <img className='pokemon-image' src={pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default} alt={pokemon.name} />
                <p className='pokemon-name'>{pokemon.name}</p>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default PokemonList;
