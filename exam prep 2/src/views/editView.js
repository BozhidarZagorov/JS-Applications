import { edit, getOne } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";

const template = (item,onSubmit) => html`
 <!-- Edit Listing Page -->
 <section id="edit-listing">
            <div class="container">
                <form @submit=${onSubmit} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>
                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value=${item.brand}>
                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value=${item.model}>
                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value=${item.description}>
                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value=${item.year}>
                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${item.imageUrl}>
                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value=${item.price}>
                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
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
        return alert('All fields are required!')
    }
    data.year = Number(data.year)
    data.price = Number(data.price) 

    try {
        await edit(itemId,data)

        page.redirect(`/details/${itemId}`)
    } catch (err) {
        alert(err.message)
    }
}