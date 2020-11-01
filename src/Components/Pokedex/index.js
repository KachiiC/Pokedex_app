import React, { useEffect, useState } from 'react'
// CSS
import "./index.css"
// Components
import {useForm} from 'react-hook-form'
import PokedexContainer from '../PokedexContainer'
import Pokeball from './pokeball.jpg'

const Pokedex = () => {

    const {register, handleSubmit} = useForm();
    const [pokeCode, setPokeCode] = useState({
})
    const [pokeImage, setPokeImage] = useState(Pokeball)
    const [pokeData, setPokeData] = useState(
        {
            "name": "",
            "id": "",
            "height": "",
            "weight": "",
            "types": [{
                "type": {
                        "name": "",
                }
            }]
        }
    )

    const onSubmit = data => {
        const submittedCode = document.getElementById("inputName").value
        setPokeCode(submittedCode)
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeCode}`)
        .then(response => response.json())
        .then(responseData => {
            setPokeData(responseData)
            setPokeImage(responseData.sprites.front_default)
        })
        .catch(err => console.log(err))

    },[pokeCode])

    const pokemonName = pokeData.name.replace(/^\w/, (c) => c.toUpperCase())
    const pokemonTypes = pokeData.types.map(
        pokemon => pokemon.type.name.replace(/^\w/, (c) => c.toUpperCase())).join(", ")

    const pokemonHeight = pokeData.height * 0.1
    const pokemonWeight = pokeData.weight * 0.1 

    
    return (
        <>
            <h1>Search for a pokemon!</h1>
            <div className="pokedex-submit-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        className="pokedex-search"
                        id="inputName" 
                        name="pokemonName" 
                        ref={register} placeholder="Enter Pokemon name or number" 
                    />
                </form>
            </div>
            <PokedexContainer image={pokeImage} 
                name={pokemonName}
                type={pokemonTypes}
                height={pokemonHeight.toFixed(1)}
                weight={pokemonWeight.toFixed(1)}
            />
        </>
    )
}

export default Pokedex