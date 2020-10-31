import React, { cloneElement, useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'

const Pokedex = () => {

    const {register, handleSubmit} = useForm();
    const [pokeCode, setPokeCode] = useState("")
    const [pokeData, setPokeData] = useState()

    const onSubmit = data => {
        const submittedCode = document.getElementById("inputName").value
        setPokeCode(submittedCode)
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeCode}`)
        .then(response => response.json())
        .then(responseData => setPokeData(responseData))
        .catch(err => console.log(err))

    },[pokeCode])

    console.log(pokeData)

    return (
        <>
            <h1> Pokedex Form </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input id="inputName" name="pokemonName" ref={register} placeholder="Enter Pokemon" />
            </form>
        </>
    )
}

export default Pokedex