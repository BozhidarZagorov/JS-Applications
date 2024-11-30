import { getOne } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import { getUserData } from "../../utils/userUtils.js";

const template = (item, isOwner) => html`
<!-- Listing Details Page -->
<section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${item.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${item.brand}</li>
                    <li><span>Model:</span>${item.model}</li>
                    <li><span>Year:</span>${item.year}</li>
                    <li><span>Price:</span>${item.price}$</li>
                </ul>

                <p class="description-para">${item.description}</p>
                  ${isOwner
                    ? html `
                    <div class="listings-buttons">
                      <a href="/catalog/${item._id}/edit" class="button-list">Edit</a>
                      <a href="/catalog/${item._id}/delete" class="button-list">Delete</a>
                    </div>
                    `
                    : ''
                  }
            </div>
        </section>
`
export default async function detailsView(ctx) {
    const itemId  = ctx.params.itemId
    const item = await getOne(itemId)
    
    const userData = getUserData()
    const isOwner = userData._id === item._ownerId
    // console.log(isOwner);
    
    
    render(template(item,isOwner))
}