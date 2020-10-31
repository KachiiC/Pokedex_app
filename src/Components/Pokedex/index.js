import React, { useEffect, useState } from 'react'
// CSS
import "./index.css"
// Components
import {useForm} from 'react-hook-form'
import TestDex from '../../TestDex'

const Pokedex = () => {

    const {register, handleSubmit} = useForm();
    const [pokeCode, setPokeCode] = useState("")
    const [pokeImage, setPokeImage] = useState("")
    const [pokeData, setPokeData] = useState(
        {
            "name": "",
            "id": ""
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

    console.log(pokeData)

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
            <TestDex image={pokeImage} 
                name={pokeData.name}

                height={pokeData.height}
                weight={pokeData.weight}
            />
        </>
    )
}

export default Pokedex