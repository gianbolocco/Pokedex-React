import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm"

const PokemonProvider = ({children}) => {

    const baseURL = 'https://pokeapi.co/api/v2/'

    const [offset,setOffset] = useState(0)
    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])

    // Utilizar CustomHook - useForm
    const {valueSearch, onInputChange, onResetForm} = useForm({valueSearch: ''})

    // Estados Simples
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

    // Llamar a 50 pokemones

    const getAllPokemons = async (limit = 50) => {
        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json()
        //console.log(data)
    
        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        }) // ahora me devuelve el arreglo de pokemones
        
        const result = await Promise.all(promises)
        console.log(result)

        setAllPokemons([
            ...allPokemons, // se combinan los nuevos 50 pokemones + los que ya tenia
            ...result
        ])
        setLoading(false)
    }

    // LLamar todos los pokemoes

    const getGlobalPokemons = async() => {
        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
        const data = await res.json()
        //console.log(data)
    
        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        }) // ahora me devuelve el arreglo de pokemones
        
        const result = await Promise.all(promises)
        console.log(result)

        setGlobalPokemons(result)
        setLoading(false)
    }

    // get pokemon por id

    const getPokemonById = async (id) => {

        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()

        return data;

    }

    useEffect( () => {

        getAllPokemons()

    },[offset]) // cada vez que cambie offset que se vuelva a ejecutar la llamada a la api

    useEffect( () => {

        getGlobalPokemons()

    },[])

    // cargar mas btn

    const onClickLoadMore = () => {
        setOffset(offset + 50)
    }

    // filter function + state
    const [typeSelected, setTypeSelected] = useState({
		grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    },) // initial state, ninguno esta seleccionado

    const [filteredPokemons, setFilteredPokemons] = useState([])

    const handleCheckbox = e => {

		setTypeSelected({
			...typeSelected,
			[e.target.name]: e.target.checked,
		});

        if(e.target.checked){
            const filteredResults = globalPokemons.filter(pokemon => pokemon.types.map(type => type.type.name).includes(e.target.name))
            setFilteredPokemons([...filteredPokemons, ...filteredResults]);
            console.log(filteredResults)
        }else {
			const filteredResults = filteredPokemons.filter(
				pokemon => pokemon.types.map(type => type.type.name).includes(e.target.name)
			);
			setFilteredPokemons([...filteredResults]);
		}
    }



  return (
    <PokemonContext.Provider value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonById,
            onClickLoadMore,
            // componente loader
            loading,
            setLoading,
            //btn filter
            active,
            setActive,
            // filter container checkbox
            handleCheckbox,
            filteredPokemons,
            setFilteredPokemons
            
        }}>
        {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider