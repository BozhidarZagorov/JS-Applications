function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook'

    const ul=document.getElementById('phonebook')
    const loadBtn =document.getElementById('btnLoad')
    const createBtn = document.getElementById('btnCreate')
    const person = document.getElementById('person')
    const phone = document.getElementById('phone')

    loadBtn.addEventListener('click',onClickLoad)
    createBtn.addEventListener('click',onClickCreate)

    async function onClickLoad() {
        ul.innerHTML=''

        const response= await fetch(url)
        const data = await response.json()

        Object.values(data).forEach(entry=>{
            
            const {person,phone,_id}=entry

            const li = createElement('li', `${person}: ${phone}`,ul)
            li.setAttribute('id',_id)

            const delButn = createElement("button",'Delete',li)

            delButn.addEventListener('click',onClickDelete)
        })
    }
    async function onClickCreate() {
        if (person.value!=='' && phone.value!=='') {
            const response=await fetch(url,{
                method:'POST',
                headers: {'Content-type': 'application/json'},
                body:JSON.stringify({person:person.value,phone:phone.value})
            })
            loadBtn.click()
            phone.value=''
            person.value=''
        }
        
    }
    async function onClickDelete(ev) {
        const id =ev.target.parentNode.id
        ev.target.parentNode.remove()

        const deleteResponse = await fetch(`${url}/${id}`,{method:'DELETE'})
    }
    function createElement(type, text, appender) {
        const result = document.createElement(type)
        result.textContent = text

        appender.appendChild(result)
        return result
    }
}

attachEvents();