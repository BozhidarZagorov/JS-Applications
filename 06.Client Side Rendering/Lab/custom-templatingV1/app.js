import {engine,render} from "./engine.js"

// rootElement.innerHTML=headingTemplate("Hello world") //xss

const rootElement = document.getElementById('root')
const headingHtml=`
    <h1>{{title}}</h1>
    <h2>{{subTitle}}</h2>
    <p>{{quote}}</p>
`

const template=engine(headingHtml)
const result=template({title:'Hello Templating',subTitle: 'Hello subtitle',quote:'custom quote'})
// rootElement.append(...elements)

render(result,rootElement)