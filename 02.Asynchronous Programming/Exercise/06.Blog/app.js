function attachEvents() {
    
    const urlPost = 'http://localhost:3030/jsonstore/blog/posts'
    const urlComments = 'http://localhost:3030/jsonstore/blog/comments'
    let btnLoadPosts = document.getElementById('btnLoadPosts')
    let postSelect = document.getElementById('posts')
    let btnViewPosts = document.getElementById('btnViewPost')
    let postTitle = document.getElementById('post-title')
    let postContent = document.getElementById('post-body')

    btnLoadPosts.addEventListener('click',handleLoadPosts)
    btnViewPosts.addEventListener('click',handleViewPosts)

    let commonData

    function handleLoadPosts() {
        
        fetch(urlPost)
        .then(res=>res.json())
        .then(data=>addPost(data))

        function addPost(data) {
            commonData=data

            postSelect.innerHTML=''

            for (const [id,postInfo] of Object.entries(data)) {
                let option = document.createElement('option')
                option.value=id
                option.textContent=postInfo.title
                option.dataset.body=postInfo.body

                postSelect.appendChild(option)
            }
        }
    }

    function handleViewPosts() {
        let selectedPostID =document.getElementById('posts').value
        postTitle.textContent=commonData[selectedPostID].title
        postContent.textContent=commonData[selectedPostID].body
        
        fetch(urlComments)
        .then(res=>res.json())
        .then(data=>handleComment(data))
        
        function handleComment(data) {
            let commentsUI=document.getElementById('post-comments')
            commentsUI.innerHTML=''

            for (const [key,commentInfo] of Object.entries(data)) {
                let li=document.createElement('li')
                li.id=commentInfo.id
                li.textContent=commentInfo.text

                commentsUI.appendChild(li)
            }
        }
    }
}

attachEvents();