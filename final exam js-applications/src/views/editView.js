import { edit, getOne } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";

const template = (item,onSubmit) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
        <div class="form form-item">
          <h2>Edit Offer</h2>
          <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="model" value=${item.model} id="model" placeholder="Drone Model" />
            <input type="text" name="imageUrl" value=${item.imageUrl} id="imageUrl" placeholder="Image URL" />
            <input type="number" name="price" value=${item.price} id="price" placeholder="Price" />
            <input type="number" name="weight" value=${item.weight} id="weight" placeholder="Weight" />
            <input type="number" name="phone" value=${item.phone} id="phone" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" value=${item.condition} id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description">${item.description}</textarea>
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
    const data = Object.fromEntries(formData)
    const itemId = this.params.itemId

    if (!Object.values(data).every(value=>!!value)) {
        // return alert('All fields are required!')
        return this.showNotification('All fields are required!')

    }

    try {
        await edit(itemId,data)

        page.redirect(`/marketplace/${itemId}`)
    } catch (err) {
        alert(err.message)
    }
}