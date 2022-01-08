const input = document.querySelector('input[type="text"]')
const submit = document.querySelector('button[type="submit"]')
const container = document.querySelector('.cards__container')

if(localStorage.listState){
    container.innerHTML = JSON.parse(localStorage.getItem('listState'))
    for(let child of container.children){
        if(child.classList.contains('completed')){
            child.firstElementChild.checked = true
        }
    }
}

submit.addEventListener('click', function(e){
    e.preventDefault()
    if(!input.value){return}
    const html = `<div class="card">
                    <input type="checkbox" name="completed" >
                    <p>${input.value}</p>
                    <button class="btn__close">&#10006;</button>
                  </div>`
    container.insertAdjacentHTML('beforeEnd',html)
    input.value = ''
    storeToDos()
})

container.addEventListener('click', function(e){
    if(e.target.classList.contains('btn__close')){
        e.target.closest('.card').remove()
    }
    if(e.target.type === 'checkbox'){
        e.target.closest('.card').classList.toggle('completed')
    }
    storeToDos()
})

function storeToDos() {
    localStorage.setItem('listState', JSON.stringify(container.innerHTML))
}