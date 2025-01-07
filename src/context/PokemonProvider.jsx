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

    const getPokemonById = async () => {

        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()

        return data;

    }

    useEffect( () => {

        getAllPokemons()

    },[])

    useEffect( () => {

        getGlobalPokemons()

    },[])

  return (
    <PokemonContext.Provider value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonById
        }}>
        {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider