import {useState,useEffect} from 'react'
import axios from 'axios';

import './Card.css';

function Card( {pokemonIdx} ){

const [ pokemonData, setPokemonData  ]  =  useState( {} );

useEffect (
    ()=>{
        async function fetchData( ){
            let result={};
            //console.log("fetch data " + pokemonIdx);
            try{
                result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdx}/` );
                //console.log(result.data);
                setPokemonData(
                    {
                        name: result.data.name,
                        moves: result.data.moves.length,
                        weight: result.data.weight,
                        abilities: result.data.abilities, // array van objecten met een ability object {name:,url:} erin
                        imageUrl: result.data.sprites.front_shiny,
                    }
                );
                //console.log( pokemonData );

            }catch (e){
                console.log(`Fetch data from pokeapi failed ${e}`  );
            }
        }

        if ( pokemonIdx >= 0  )fetchData();
    },
        [pokemonIdx]
);

return(
    <div className="card" key={pokemonData.name}>
        {Object.keys(pokemonData).length > 0 &&
        <>
            <h2>{pokemonIdx} {pokemonData.name}</h2>
            <img src={pokemonData.imageUrl} alt={pokemonData.name}/>
            <h3>Moves: {pokemonData.moves}</h3>
            <h3>Weight: {pokemonData.weight}</h3>
            <h4>Abilities</h4>
        </>
        }
        { Object.keys(pokemonData).length > 0 &&
        pokemonData.abilities.map((able) => {
                    //console.log(`ability ${able.ability.name}`);
                    return(
                    <p key={able.ability.name}>{able.ability.name}</p>
                    );
                })

        }
    </div>
);

}

export default Card
