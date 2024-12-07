import { create } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";

const template = (onSubmit) => html`
<!-- Create Page (Only for logged-in users) -->
<section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form @submit=${onSubmit} class="create-form">
              <input type="text" name="category" id="category" placeholder="Character Type"/>
              <input type="text" name="image-url" id="image-url" placeholder="Image URL"/>
              <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
            <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2" cols="10"></textarea>
              <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`
export default async function createView(ctx) {
    render(template(createFormSubmitHandler))
}

async function createFormSubmitHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    // const data = Object.fromEntries(formData)

    const category = formData.get('category')
    const imageUrl = formData.get('image-url')
    const description = formData.get('description')
    const moreInfo = formData.get('additional-info')


    // if (!Object.values(data).every(value=>!!value)) {
    //     return alert('All fields are required!')
    // }
    if (!category || !imageUrl ||!description || !moreInfo) {
        return alert('All fields are required!')
    }
    const character = {
        category,
        imageUrl,
        description,
        moreInfo
    }

    try {
        await create(character)

        page.redirect('/characters')
    } catch (err) {
        alert(err.message)
    }
    

}