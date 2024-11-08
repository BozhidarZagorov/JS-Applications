import { html,render } from "../node_modules/lit-html/lit-html.js";
import {towns} from "./towns.js"

document.querySelector('button').addEventListener('click',search)
const townsRoot = document.getElementById('towns')
const resultRoot = document.getElementById('result')
const inputRef = document.getElementById('searchText')

render(ulTemplate(towns),townsRoot)

function update(match) {
   render(ulTemplate(towns,match),townsRoot)
}

function search() {
   const searchText=inputRef.value
   const match = towns.filter(town=>town.includes(searchText))

   if (searchText ==='') {
      return
   }

   update()
   renderMatch(match.length)


}

function ulTemplate(towns,match) {
   return html`
   <ul>
      ${towns.map(town=>createTemplate(town,match?.includes(town)))}
   </ul>
   `
}

function createTemplate(town,isActive) {
   return html `<li class=${isActive ? 'active' : ''}>${town}</li>`
}

function renderMatch(count) {
   render(html`${count} matches found`,resultRoot)
}
