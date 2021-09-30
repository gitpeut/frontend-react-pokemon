import {useEffect} from 'react'



function Card( {pokemonIdx} ){

const [ pokemonData, setPokemonData  ]    useState( {} );

useEffect (
    ()=>{
        async function fetchData( ){
            let result={};
            console.log("fetch data " + pokemonIdx);
            try{
                result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdx}/` );
                console.log(result.data);
                setPokemonData(
                    {
                        name: result.data.name,
                        moves: result.data.moves.length,
                        weight: result.data.weight,
                        abilities: result.data.abilies, // array van ability objecten {
                    }
                );

            }catch (e){
                console.log(`Fetch data from openweather.org failed ${e}`  );
            }
        }

        if ( location !== '' )fetchData();
    },
        [PokemonIdx]
);

}

export default Card
