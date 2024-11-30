import { getAll } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";

const template = (items) => html`
 <!-- All Listings Page -->
 <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">

                <!-- Display all records -->
                 ${items.map(item =>html`
                    <div class="listing">
                    <div class="preview">
                        <img src=${item.imageUrl}>
                    </div>
                    <h2>${item.brand} ${item.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${item.year}</h3>
                            <h3>Price: ${item.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${item._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                    </div>
                        `)}
                <!-- Display if there are no records -->
                 ${items.length === 0
                    ? html`<p class="no-cars">No cars in database.</p>`
                    : ''
                 }
            </div>
        </section>
`
export default async function catalogView(ctx) {
    const items = await getAll()

    render(template(items))
}