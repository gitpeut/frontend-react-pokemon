import {useState, useEffect} from 'react'
import axios from 'axios';

import './Card.css';

function Card({pokemonUrl}) {

    const [pokemonData, setPokemonData] = useState({});

    useEffect(
        () => {
            async function fetchData() {
                let result = {};
                //console.log("fetch data " + pokemonUrl);
                try {
                    result = await axios.get(`${pokemonUrl}`);
                    //console.log(result.data);
                    setPokemonData(
                        {
                            name: result.data.name,
                            id: result.data.id,
                            moves: result.data.moves.length,
                            weight: result.data.weight,
                            abilities: result.data.abilities, // array van objecten met een ability object {name:,url:} erin
                            imageUrl: result.data.sprites.front_shiny,
                        }
                    );
                } catch (e) {
                    console.log(`Fetch data from pokeapi failed ${e}`);
                }
            }

            if (pokemonUrl) fetchData();
        },
        [pokemonUrl]
    );


    return (
        <div className="card" key={pokemonData.name}>
            {Object.keys(pokemonData).length > 0 &&
            <>
                <h2>{pokemonData.id} {pokemonData.name}</h2>
                <img src={pokemonData.imageUrl} alt={pokemonData.name} />
                <h3>Moves: {pokemonData.moves}</h3>
                <h3>Weight: {pokemonData.weight}</h3>
                <h4>Abilities</h4>
            </>
            }
            {Object.keys(pokemonData).length > 0 &&
            pokemonData.abilities.map((able) => {
                //console.log(`ability ${able.ability.name}`);
                return (
                    <p key={able.ability.name}>{able.ability.name}</p>
                );
            })

            }
        </div>
    );

}

export default Card
