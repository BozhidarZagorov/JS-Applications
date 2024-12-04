import { getOne } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import { getUserData } from "../../utils/userUtils.js";

const template = (item, isOwner) => html`
<!-- Details page -->
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1"/>
            <div>
              <p id="details-type">${item.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">${item.description}</p>
                  <p id="more-info">${item.learnMore}</p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">0</span></h3>
              ${isOwner
                ? html`
                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                <a href="/solutions/${item._id}/edit" id="edit-btn">Edit</a>
                <a href="/solutions/${item._id}/delete" id="delete-btn">Delete</a>
                `
                :''
              }
                <!--Bonus - Only for logged-in users ( not authors )-->
                <!-- <a href="#" id="like-btn">Like</a> -->
              </div>
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