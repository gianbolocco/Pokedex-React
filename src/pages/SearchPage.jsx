import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { useLocation } from 'react-router-dom'
import CardPokemon from '../components/CardPokemon'

const SearchPage = () => {

  const location = useLocation()

  const {globalPokemons} = useContext(PokemonContext)

  const filteredPokemons = globalPokemons.filter(pokemon => pokemon.name.includes(location.state.toLowerCase())) // filtramos a todos los pokemons que en el nombre tengan el criterio de busqueda

  return (
    //<div>search</div>
    <div className='container'>
      <p className="p-search"><span>{filteredPokemons.length}</span> results: </p>
      <div className='card-list-pokemon container'>
        {filteredPokemons.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}></CardPokemon>)}
      </div>
    </div>
  )
}

export default SearchPage