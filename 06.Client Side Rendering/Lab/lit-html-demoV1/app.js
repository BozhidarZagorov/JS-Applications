import {html,render} from "./node_modules/lit-html/lit-html.js"

const rootElement = document.getElementById('root')

const activeClass='active'
const canRegister = true
let counter = 0
let names = ['Pesho','Gosho','Stamat','Kalinka']

const nameClickHanlder =(name)=>{
    
}

const helloTemplate = (text)=>html`
    <header>
    <h1>Hello ${text}!</h1>
    <nav>
        <ul class='navigation'>
            <li class=${activeClass}>Home</li>
            <li>About</li>
            <li>More</li>
            <li>Contacts</li>
        </ul>
    </nav>
    </header>
    <main>
        ${counter===0}

        <button ?disabled=${!canRegister}>Register</button>

        ${names.map(name=> html`<li @click=>${name}</li>`)}
    </main>
    <footer>
        <div>All rights reserved &copy;</div>
    </footer>
`
render(helloTemplate(`Lit-Html`),rootElement)