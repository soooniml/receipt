const name = document.querySelector('.name')
const receipt = document.querySelector('.receipt')
const submit = document.querySelector('.submit')
const container = document.querySelector('.card-block')
// const card = document.querySelector('.card-inner')

// card.addEventListener('click' , function () {
//     card.classList.toggle('is-flipped')
// })



window.addEventListener('load' , () =>{
    if(!localStorage.getItem('menu')){
        localStorage.setItem('menu' , JSON.stringify([]))
    }else{
        const base = JSON.parse(localStorage.getItem('menu'))

        const newBasewithId = base.map((item , index) =>{
            return{...item , id:index}
        })


        localStorage.setItem('menu' , JSON.stringify([...newBasewithId]))

        const dataId = JSON.parse(localStorage.getItem('menu'))
        console.log(dataId);



        const temp = dataId.reduce((total , {name, receipt, id}) =>{
            return total + CardTemplate(name , receipt, id)
        }, '')

        container.innerHTML = temp
    }
})


submit.addEventListener('click' , e =>{
    e.preventDefault
    if(name.value !== '' && receipt.value !== ''){
        const base = JSON.parse(localStorage.getItem('menu'))

        localStorage.setItem('menu' , JSON.stringify(
            [ 
                ...base,
                {
                    name:name.value,
                    receipt:receipt.value
                }
            ]
        ))
    }

    name.value = ''
    receipt.value = ''

    window.location.reload()
})


function CardTemplate(name , receipt , id){
    return `
    <div class="card">
        <div class="card-inner">
            <div class="card-face card-face-front">
                <div class="card-front-content">
                    <h3>${name}</h3>
                        <button class="change" data-id="${id}" onclick="Change(${id})">Изменить</button>
                        <button class="delete" data-id="${id}" onclick="Delete(${id})">Удалить</button>
                </div>
            </div>

            <div class="card-face card-face-back">
                <div class="card-content">
                    <div class="card-body">
                        <h5>${name}</h5>
                        <p>${receipt}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}




function Delete(id){
    const data = JSON.parse(localStorage.getItem('menu'))
    const deletedUser = data.filter(item => item.id !== id)
    localStorage.setItem('menu' , JSON.stringify(deletedUser))
    window.location.reload()
}


function Change(id){
    const data = JSON.parse(localStorage.getItem('menu'))
    const filtered = data.map(item => {
        if(item.id === id){
            return {
                ...item,
                name:prompt('New name?')

            }
        }
    })

    localStorage.setItem('menu', JSON.stringify(filtered))
    window.location.reload()
}







