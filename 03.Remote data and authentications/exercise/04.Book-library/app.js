document.addEventListener('DOMContentLoaded',()=>{
    const loadBookBtn=document.getElementById('loadBooks')
    const bookForm =document.querySelector('form')
    const bookList = document.querySelector('tbody')

    const url = 'http://localhost:3030/jsonstore/collections/books'

    loadBookBtn.addEventListener('click',loadBooks)
    bookForm.addEventListener('submit',handleFormSubmit)

    async function loadBooks() {
        const response = await fetch(url)
        const data = await response.json()

        bookList.innerHTML=''

        Object.entries(data).forEach(([id,book])=>{
            const row = document.createElement('tr')
            const titleCell = document.createElement('td')
            titleCell.textContent=book.title
            row.appendChild(titleCell)

            const authorCell = document.createElement('td')
            authorCell.textContent=book.author
            row.appendChild(authorCell)

            const actionCell = document.createElement('td')

            const editBtn = document.createElement('button')
            editBtn.textContent='Edit'
            editBtn.setAttribute('data-id',id)
            // editBtn.addEventListener('click',handleEdit)
            actionCell.appendChild(editBtn)

            const delBtn = document.createElement('button')
            delBtn.textContent='Delete'
            delBtn.setAttribute('data-id',id)
            // delBtn.addEventListener('click',handleDelete)
            actionCell.appendChild(delBtn)

            row.appendChild(actionCell)
            bookList.appendChild(row)
        })
    }
    async function handleFormSubmit() {
        const formData = new FormData(bookForm)
        const title = formData.get('title')
        const author = formData.get('author')
        const bookId=bookForm.getAttribute('data-id')

        const {book}={title,author}

        try {
            let response
            if (bookId) {
                // response=await fetch(`${url}/${bookId}`,{
                //     method:'POST',

                // })
            }else{
                response=await fetch(url,{
                    method:'POST',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify(book)
                })
            }
        } catch (error) {
            
        }

        const isValidBook=title!==''&&author!==''

        if (condition) {
            
        }
    }

})