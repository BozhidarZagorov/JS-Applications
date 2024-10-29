async function solution() {
    const main  = document.getElementById('main')
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`
    const responce = await fetch(url)
    const data = await responce.json()

    data.forEach(el => {
        let divAccordion = createElement('div','',['class','accordion'])
        let divHead = createElement('div','',['class','head'])
        let span = createElement('span',el.title)
        let button = createElement('button','More',['class','button','id',el._id])
        let divExtra = createElement('div','',['class','extra'])
        let p=createElement('p')

        button.addEventListener('click',toggle)

        divHead.appendChild(span)
        divHead.appendChild(button)
        divExtra.appendChild(p)

        divAccordion.appendChild(divHead)
        divAccordion.appendChild(divExtra)

        main.appendChild(divAccordion)

    });

    async function toggle(ev) {
        const accordion=ev.target.parentNode.parentNode
        const p =accordion.querySelector('.extra p')
        const extra = accordion.querySelector('.extra')
        const id = ev.target.id

        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`
        
        const responce=await fetch(url)
        const data = await responce.json()

        p.textContent=data.content

        const hidden = ev.target.textContent==='More'
        extra.style.display=hidden ? 'block' : 'none'
        ev.target.textContent=hidden ? 'Less' : 'More'
    }
    //helper function for creating elements
    function createElement(type,content,atributes=[]) {
        const element = document.createElement(type)

        if (content) {
            element.textContent = content
        }
        if (atributes.length>0) {
            for (let i = 0; i < atributes.length; i+=2) {
                element.setAttribute(atributes[i],atributes[i+1])
                
            }
        }
        return element
    }
    
}
window.addEventListener('load',solution)