import { edit, getOne } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";

const template = (item,onSubmit) => html`
 <!-- Edit Page (Only for logged-in users) -->
 <section id="edit">
          <div class="form">
            <img class="border" src="../../images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input type="text" name="type" value=${item.type} id="type" placeholder="Solution Type"/>
              <input type="text" name="image-url" value=${item.imageUrl} id="image-url" placeholder="Image URL"/>
              <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${item.description}</textarea>
              <textarea id="more-info" name="more-info" placeholder="more Info" rows="2" cols="10">${item.learnMore}</textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`
export default async function editView(ctx) {
    const itemId = ctx.params.itemId
    const item = await getOne(itemId)

    render(template(item, editFormSubmitHandler.bind(ctx)))
}

async function editFormSubmitHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    // const data = Object.fromEntries(formData)
    const itemId = this.params.itemId

    const type = formData.get('type')
    const imageUrl = formData.get('image-url')
    const description = formData.get('description')
    const learnMore = formData.get('more-info')


    // if (!Object.values(data).every(value=>!!value)) {
    //     return alert('All fields are required!')
    // }

    if (!type || !imageUrl ||!description || !learnMore) {
      return alert('All fields are required!')
    }
    const solution = {
        type,
        imageUrl,
        description,
        learnMore
    }

    try {
        await edit(itemId,solution)

        page.redirect(`/solutions/${itemId}`)
    } catch (err) {
        alert(err.message)
    }
}