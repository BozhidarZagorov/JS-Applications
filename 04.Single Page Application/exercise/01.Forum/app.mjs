function createEl(tag,content,elClass,parent,...children) {
    let el = document.createElement(tag)
    
}

const url = 'http://localhost:3030/jsonstore/collections/myboard/posts'
loadPosts()

const topicTitleContainer = document.querySelector('.topic-title')
const form  = document.querySelector('form')
const cancelBtn = form.querySelector('.cancel')
const postBtn = form.querySelector('.public')
cancelBtn.addEventListener('click',cancel)
postBtn.addEventListener('click',createPost)

const postDetailsSection = document.querySelector('.postDetailsContainer')
const postDetailsSectionChildren = [...postDetailsSection.children]
postDetailsSectionChildren.forEach(c=>c.remove())
// postDetailsSection.style.display='none'

function cancel(e) {
    e.preventDefault()
    form.reset()
}


async function createPost(e) {
    e.preventDefault()
    const date = new Date()
    const dateStr = date.toISOString()

    const topicNameInput = document.querySelector('#topicName')
    const usernameInput=document.querySelector('#username')
    const postTextInput=document.querySelector('#postText')

    const topicNameValue = topicNameInput.value
    const usernameBalue = usernameInput.value
    const postTextValue = postTextInput.value

    if (topicNameValue.trim()==''||usernameBalue.trim()==''||postTextValue.trim()=='') {
        const post = {
            title:topicNameValue,
            username:usernameBalue,
            post: postTextValue,
            date: dateStr
        }
        const settings = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(post)
        }
        const createPostRequest = await fetch(url,settings)
        console.log(createPostRequest);
        
        form.reset()
        loadPosts()
    }

}
async function loadPostDetails(id) {
    const post = await fetch(`${url}/${id}`)
    console.log(post);
    
    topicTitleContainer.style.display='none'
    // postTopicForm.style.display='none'
}

async function loadPosts() {
    const postRequest = await fetch(url)
    const posts = await postRequest.json()
    console.log(posts);
    const postsObj=Object.values(posts)

    for (const post of postsObj) {
        const topicContainer = document.createElement('div')
        topicContainer.classList.add('topic-container')
        const tipicNameWrapper = document.createElement('div')
        tipicNameWrapper.classList.add('topic-name-wrapper')
        const topicName=document.createElement('div')
        topicName.classList.add('topic-name')
        const titleAnchor=document.createElement('a')
        titleAnchor.classList.add('normal')
        const titleHeader = document.createElement('h2')
        titleHeader.textContent=post.title
        const columnsDiv=document.createElement('div')
        columnsDiv.classList.add('columns')
        const columnsPaddingDiv = document.createElement('div')

        const timePara = document.createElement('p')
        timePara.textContent='Date: '
        const time = document.createElement('time')
        time.textContent=post.date
        const nickDiv = document.createElement('div')
        nickDiv.classList.add('nick-name')

        const nickPara = document.createElement('p')
        nickPara.textContent='Username: '
        const nickSpan = document.createElement('span')
        nickSpan.textContent=post.username

        topicContainer.appendChild(tipicNameWrapper)
        tipicNameWrapper.appendChild(topicName)
        topicName.appendChild(titleAnchor)
        titleAnchor.appendChild(titleHeader)

        topicName.appendChild(columnsDiv)
        columnsDiv.appendChild(columnsPaddingDiv)

        columnsPaddingDiv.appendChild(timePara)
        timePara.appendChild(time)
        columnsPaddingDiv.appendChild(nickDiv)

        nickDiv.appendChild(nickPara)
        nickPara.appendChild(nickSpan)

        topicTitleContainer.appendChild(topicContainer)    

        topicContainer.addEventListener('click',()=>loadPostDetails(post._id))
    }

}
