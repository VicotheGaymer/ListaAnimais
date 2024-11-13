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

    const fform = document.getElementById('fform');
    fform.innerHTML = '';
}

async function apagarLista()
{
    const animalList = document.getElementById('animalList');
    animalList.innerHTML = '';
}

async function apagaItem() {
    const fform = document.getElementById('fform');
    fform.innerHTML = `
        <div>
            <form>
                <label>Qual o Id do Animal:</label>
                <input type="number" id="animalId" required>
            </form>
            <button onclick="deletaAnimal()">Confirmar</button>
        </div>`;
}

async function deletaAnimal() {
    const ID = document.getElementById('animalId').value;

    try {
        await fetch(`${apiUrl}/${ID}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Erro ao deletar animal:', error);
    }

    const fform = document.getElementById('fform');
    fform.innerHTML = '';
}

async function atualizaItem() {
    const fform = document.getElementById('fform');
    fform.innerHTML = `
        <div>
            <form>
                <div>
                    <label>Qual o Id do Animal:</label>
                    <input type="number" id="animalId" required>
                </div>
                <div>
                    <label>Nome:</label>
                    <input type="text" id="atualizaNome">
                </div>
                <div>
                    <label>Idade:</label>
                    <input type="number" id="atualizaIdade">
                </div>
                <div>
                    <label>Raça:</label>
                    <input type="text" id="atualizaRaca">
                </div>
                    </form>
            <button onclick="atualizaAnimal()">Confirmar</button>
        </div>`;
}

async function atualizaAnimal() {
    const ID = document.getElementById('animalId').value;
    const updatedAnimal = {};

    const nome = document.getElementById("atualizaNome").value;
    if (nome) {
        updatedAnimal.Nome = nome;
    }

    const idade = document.getElementById("atualizaIdade").value;
    if (idade) {
        updatedAnimal.Idade = idade;
    }

    const raca = document.getElementById("atualizaRaca").value;
    if (raca) {
        updatedAnimal.Raca = raca;
    }

    if (Object.keys(updatedAnimal).length === 0) {
        alert("Por favor, forneça pelo menos um campo para atualizar.");
        return;
    }

    try {
        await fetch(`${apiUrl}/${ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAnimal)
        });
    } catch (error) {
        console.error('Erro ao atualizar animal:', error);
    }

    const fform = document.getElementById('fform');
    fform.innerHTML = '';
}

async function adicionaItem() {
    const fform = document.getElementById('fform');
    fform.innerHTML = `
        <div>
             <form>
                <div>
                    <label>Nome:</label>
                    <input type="text" id="Nome">
                </div>
                <div>
                    <label>Idade:</label>
                    <input type="number" id="Idade">
                </div>
                <div>
                    <label>Raça:</label>
                    <input type="text" id="Raca">
                </div>
            </form>
            <button onclick="cadastrarAnimal()">Confirmar</button>
        </div>`;
}
