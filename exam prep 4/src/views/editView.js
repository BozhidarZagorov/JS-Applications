import { edit, getOne } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";

const template = (item,onSubmit) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
  <div class="form">
    <img class="border" src="../../images/border.png" alt="">
    <h2>Edit Character</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input type="text" name="category" value=${item.category} id="category" placeholder="Character Type"/>
    <input type="text" name="image-url" value=${item.imageUrl} id="image-url" placeholder="Image URL"/>
    <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${item.description}</textarea>
  <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2" cols="10">${item.moreInfo}</textarea>
      <button type="submit">Edit</button>
    </form>
    <img class="border" src="../../images/border.png" alt="">
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
    const solution = {
        category,
        imageUrl,
        description,
        moreInfo
    }

    try {
        await edit(itemId,solution)

        page.redirect(`/characters/${itemId}`)
    } catch (err) {
        alert(err.message)
    }
}