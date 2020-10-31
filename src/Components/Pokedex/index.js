import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'

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
            <h1> Pokedex Form </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input id="inputName" name="pokemonName" ref={register} placeholder="Enter Pokemon name or nubmer" />
            </form>
            <div>
                <img src={pokeImage} alt="pokedex-pokemon"/>
                <h1>{pokeData.name}</h1>
                <h6>Pokemon #: {pokeData.id}</h6>
            </div>
        </>
    )
}

export default Pokedex