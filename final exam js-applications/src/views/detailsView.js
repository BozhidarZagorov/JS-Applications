import { getOne } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import { getUserData } from "../../utils/userUtils.js";

const template = (item,isOwner) => html`
<!-- Details page -->

<section id="details">
        <div id="details-wrapper">
          <div>
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-model">${item.model}</p>
          </div>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="details-price">Price: €${item.price}</p>
              <p class="details-condition">Condition: ${item.condition}</p>
              <p class="details-weight">Weight: ${item.weight}g</p>
              <p class="drone-description">${item.description}</p>
              <p class="phone-number">Phone: ${item.phone}</p>
            </div>
            ${isOwner
              ? html`
              <!--Edit and Delete are only for creator-->
                <div class="buttons">
                  <a href="/marketplace/${item._id}/edit" id="edit-btn">Edit</a>
                  <a href="/marketplace/${item._id}/delete" id="delete-btn">Delete</a>
                </div>
              `
              :''
            }
            
          </div>
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
