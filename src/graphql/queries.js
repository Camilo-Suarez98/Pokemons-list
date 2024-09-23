import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query getAllPokemon {
    pokemon_v2_pokemon {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      name
      weight
      height
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;
