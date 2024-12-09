import { getAll } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";

const template = (items) => html`
<!-- Dashboard page -->
<h3 class="heading">Marketplace</h3>
      <section id="dashboard">
        ${items.map(item=>html`
          <!-- Display a div with information about every post (if any)-->
            <div class="drone">
              <img src=${item.imageUrl} alt="example1" />
              <h3 class="model">${item.model}</h3>
              <div class="drone-info">
                <p class="price">Price: ${item.price}</p>
                <p class="condition">Condition: ${item.condition}</p>
                <p class="weight">Weight: ${item.weight}g</p>
              </div>
              <a class="details-btn" href="/marketplace/${item._id}">Details</a>
            </div>
          `)}
        
      </section>
      ${items.length == 0
        ?
        html `
        <!-- Display an h2 if there are no posts -->
        <h3 class="no-drones">No Drones Available</h3>      
        `
        :''
      }
      

`
export default async function dashBoardView(ctx) {
    const items = await getAll()

    // /////////////////////////////
    // let items = await getAll()
    // items=[] //testing case no items added
    // /////////////////////////////

    render(template(items))
}