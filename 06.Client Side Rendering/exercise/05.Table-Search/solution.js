import {html,render} from "../node_modules/lit-html/lit-html.js"

const url = 'http://localhost:3030/jsonstore/advanced/table'
const root = document.querySelector('tbody')
solve()

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   getData()

   function onClick() {

   }
   async function getData() {
      const responce = await fetch(url)
      const data = await responce.json()
      const createRows = (items) =>{
         html`${items.map(
            (el)=>{
               html`
               <tr>
                  <th>${el.firstName} ${el.lastName}</th>
                  <th>${el.email}</th>
                  <th>${el.course}</th>
               </tr>
               `
            }
         )}`
         render(createRows(items),root)
      }
   }
}