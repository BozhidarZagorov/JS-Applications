import { getAllOwner } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import { getUserData } from "../../utils/userUtils.js";


const template = (items) => html `
<!-- My Listings Page -->
<section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">

                ${items.map(item => html`
                            <!-- Display all records -->
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
                
                ${items.length === 0
                    ?
                    html `
                    <!-- Display if there are no records -->
                    <p class="no-cars"> You haven't listed any cars yet.</p>
                    `
                    :''
                }
            </div>
        </section>
`

export default async function myListedView(ctx) {
    const userData = getUserData()
    const items = await getAllOwner(userData._id)

    render(template(items))
}