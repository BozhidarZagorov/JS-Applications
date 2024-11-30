import { create } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";

const template = (onSubmit) => html`
    <!-- Create Listing Page -->
    <section id="create-listing">
            <div class="container">
                <form @submit=${onSubmit} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>
                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">
                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">
                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">
                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">
                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">
                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">
                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
`
export default async function createView(ctx) {
    render(template(createFormSubmitHandler))
}

async function createFormSubmitHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    if (!Object.values(data).every(value=>!!value)) {
        return alert('All fields are required!')
    }
    data.year = Number(data.year)
    data.price = Number(data.price)      // might throw on tests // it actualy did cuz the tests are ... amazing
    
    try {
        await create(data)

        page.redirect('/catalog')
    } catch (err) {
        alert(err.message)
    }

}