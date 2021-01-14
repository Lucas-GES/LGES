//Cria o array data vazio
let data = [];

//Função para renderizar botões e inputs no html
function renderTodo() {

    //Seleciona pela classe "todo" e torna vazia a lista de tarefas ao recarregar
    document.querySelector('.todo').innerHTML = '';

    //For para selecionar a lista de tarefas no html
    data.forEach(task => {

        //Variavel "li" que faz a criação do elemento "li" no html
        let li = document.createElement('li');

        // Faz a inserção dos elementos input, label e button no "li" dentro do html
        li.innerHTML = `
            <input type="checkbox" id="task-${task.id}">
            <label for="task-${task.id}">${task.title}</label>
            <button type="button">x</button>
        `;

        /*Seleciona o elemento "input" de li e espera o event "change" 
        para acionar o Css de modificação no elemento "input" do tipo "checkbox" */
        li.querySelector('input').addEventListener("change", e => {

            /*Se o "checkbox" estiver selecionado aplica o efeito da configuração CSS "complete"
            Senão estiver dae remove o efeito */
            if (e.target.checked) {
                li.classList.add('complete');
            } else {
                li.classList.remove('complete');
            }

        });

        //Seleciona o elemento "button" de "li" e espera o event "click" para selecionar o elemento
        li.querySelector('button').addEventListener('click', e => {
            
           let button =  e.target; // button recebe objeto procurado pelo seletor
           let li = button.parentNode; //Seleciona o elemento pai de "button"
           let input = li.querySelector('input'); // input recebe o elemento "input" selecionado do "li"
           let id = input.id;  // id recebe o id de input
           let idArray = id.split('-'); // idArray recebe o id dividido pelo "split"
           let todoId = idArray[1]; // todoId recebe o elemento da posição 1 do "id" divido (O que vier após o "-")
           let title = li.querySelector('label').innerText; // title recebe o text contido no elemento "label" de "li"

           // If para confirmar exclusão da tarefa passando o nome da tarfa a ser excluida em "${title}"
           if (confirm(`Deseja realmente excluir a Tarefa ${title}?`)) {
           
            //Sobreescreve o array com um novo filtrado , selecionando apenas os que forem de id diferente do selecionado
            data = data.filter(task => task.id !== parseInt(todoId));
            
            // Renderiza novamente a lista de tarefas
            renderTodo();

           }

        });

        // Seleciona pela classe "todo" e adiciona as alterações em "li" através do "append"
        document.querySelector('.todo').append(li);

    });

}

// Seleciona pelo id "new-task" e espera o event "keyup" para fazer adição da tarefa nova
document.querySelector('#new-task').addEventListener('keyup', e => {

    // Se a tecla "Enter" for pressionada 
    if (e.key === 'Enter') {
        // Adiciona com o metodo "push" dando um id com o "length" +1 e um title com o que for digitado
        data.push({
            id: data.length+1,
            title: e.target.value
        });

        // Limpa o input para uma nova digitação
        e.target.value = "";

        // Atualiza a lista com os novos elementos chamando a função renderTodo()
        renderTodo();

    }

});
// Chama a função renderTodo()
renderTodo();