import { html,render } from "../node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
document.querySelector('form').addEventListener('submit',addItem)
const root = document.getElementById('menu')

onLoad()
async function onLoad() {
    const responce = await fetch(url)
    const data = await responce.json()
    const option =Object.values(data).map(option=>optionTemplate(option))
    
    update(option)
}
function update(data) {
    render(data,root)
}
function addItem(e) {
    e.preventDefault()
    const inputRef = document.getElementById('itemText')
    const text = inputRef.value
    if (text==='') {
        return
    }
    inputRef.value=''
    addItemToDB({text})
}
function optionTemplate(data) {
    return html`
    <option value="${data._id}">${data.text}</option>
    `
}
async function addItemToDB(data) {
    const responce = await fetch(url,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(data)
    })
    onLoad()
    
}