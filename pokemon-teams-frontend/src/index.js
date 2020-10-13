const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers/`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

document.addEventListener("DOMContentLoaded", function(e) {

    const getTrainers = () => {
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(data => renderTrainers(data))
    }
    
    const renderTrainers = (data) => {
        const trainerList = document.querySelector(".trainerList")

        for(const trainer of data) {
            renderTrainer(trainer)
        }
    }

    const renderTrainer = (trainer) => {
        const main = document.querySelector("main")
        const trainerDiv = document.createElement("div")
        trainerDiv.classList.add("card")
        trainerDiv.dataset.id = trainer.id

        trainerDiv.innerHTML = `
            <p>${trainer.name}</p>
            <button class="addPokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
                <ul class="trainerList">
                </ul>
        `
        for(const pokemon of trainer.pokemons) {
            // const trainerDiv = document.querySelector(".card")
            renderTrainerDiv(pokemon, trainerDiv)
        }

        main.appendChild(trainerDiv)        
    }

    const renderTrainerDiv = (pokemon, trainerDiv) => {
        const ul = trainerDiv.querySelector(".trainerList")
        const li = document.createElement("li")
        li.innerHTML = `
        ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        `
        if(ul.childElementCount < 6) {
            ul.appendChild(li)
        }
        else {
            alert("Party is full!");
        }

    }

    

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.matches(".addPokemon")) {
                const div = e.target.parentNode
                console.log(div)
                const button = e.target
                const buttonId = button.dataset.trainerId
                // const addPokemonToTrainer
                options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        "trainer_id": buttonId
                        })
                }

                fetch(POKEMONS_URL, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    renderTrainerDiv(data, div)
                }
                    )
            }
            else if(e.target.matches(".release")) {
                const button = e.target
                const buttonId = button.dataset.pokemonId
                const div = e.target.parentNode
                deletePokemon(buttonId)
                button.parentNode.remove()
            }
        })
    }

    const deletePokemon = (buttonId) => {
        options = {
            method: "DELETE",
        }

        fetch(POKEMONS_URL + buttonId, options)
        .then(response => response.json())
    }


getTrainers();
clickHandler();

//closing
})
