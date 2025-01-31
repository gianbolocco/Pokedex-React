import React, { useContext, useState, useEffect } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { primerMayuscula } from '../helper/helper'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'


const PokemonPage = () => {
	
  const {getPokemonById} = useContext(PokemonContext)

  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})

  const {id} = useParams()

  const fetchPokemon = async id => {

    const data = await getPokemonById(id)
    setPokemon(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemon(id)
  }, [id])
  

  return (
	<main className='container main-pokemon'>
		{loading ? (
			<Loader />
		) : (
			<>
				<div className='header-main-pokemon'>
					<span className='number-pokemon'>#{pokemon.id}</span>
					<div className='container-img-pokemon'>
						<img
							src={pokemon.sprites.other.dream_world.front_default}
							alt={`Pokemon ${pokemon?.name}`}
						/>
					</div>

					<div className='container-info-pokemon'>
						<h1>{primerMayuscula(pokemon.name)}</h1>
						<div className='card-types info-pokemon-type'>
							{pokemon.types.map(type => (
								<span key={type.type.name} className={`${type.type.name}`}>
									{type.type.name}
								</span>
							))}
						</div>
						<div className='info-pokemon'>
							<div className='group-info'>
								<p>Height</p>
								<span>{pokemon.height} in</span>
							</div>
							<div className='group-info'>
								<p>Weight</p>
								<span>{pokemon.weight} lb</span>
							</div>
						</div>
					</div>
				</div>

				<div className='container-stats'>
					<h1>Stats</h1>
					<div className='stats'>
						<div className='stat-group'>
							<span>Hp</span>
							<div className='progress-bar'></div>
							<span className='counter-stat'>
								{pokemon.stats[0].base_stat}
							</span>
						</div>
						<div className='stat-group'>
							<span>Attack</span>
							<div className='progress-bar'></div>
							<span className='counter-stat'>
								{pokemon.stats[1].base_stat}
							</span>
						</div>
						<div className='stat-group'>
							<span>Defense</span>
							<div className='progress-bar'></div>
							<span className='counter-stat'>
								{pokemon.stats[2].base_stat}
							</span>
						</div>
						<div className='stat-group'>
							<span>Special Attack</span>
							<div className='progress-bar'></div>
							<span className='counter-stat'>
								{pokemon.stats[3].base_stat}
							</span>
						</div>
						<div className='stat-group'>
							<span>Special Defense</span>
							<div className='progress-bar'></div>
							<span className='counter-stat'>
								{pokemon.stats[4].base_stat}
							</span>
						</div>
						<div className='stat-group'>
							<span>Speed</span>
							<div className='progress-bar'></div>
							<span className='counter-stat'>
								{pokemon.stats[5].base_stat}
							</span>
						</div>
					</div>
				</div>
			</>
		)}
	</main>
);
}

export default PokemonPage