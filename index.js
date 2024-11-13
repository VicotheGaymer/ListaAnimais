const apiUrl = 'https://6734a91fa042ab85d11b1ef7.mockapi.io/30/Animais';

async function fetchAnimais() 
{
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const animalList = document.getElementById('animalList');
        animalList.innerHTML = '';

        data.forEach(animal => {
            const item = document.createElement('div');
            item.classList.add('animal-item');
            item.innerHTML = `<strong>ID:</strong> ${animal.ID} - ${animal.Nome} (${animal.Idade} anos) – ${animal.Raca}`;
            animalList.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao buscar animais:', error);
    }
}

async function cadastrarAnimal() 
{
    const novoAnimal = {
        Nome: document.getElementById("Nome").value,
        Idade: document.getElementById("Idade").value,
        Raca: document.getElementById("Raca").value
    };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoAnimal)
        });
    } catch (error) {
        console.error('Erro ao cadastrar animal:', error);
    }
}

function apagarLista()
{
    const animalList = document.getElementById('animalList');
    animalList.innerHTML = '';
}
