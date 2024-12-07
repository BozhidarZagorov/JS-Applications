import { getAll } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";

const template = (items) => html`
    <!-- Dashboard page -->
    <h2>Characters</h2>
        <section id="characters">
          <!-- Display a div with information about every post (if any)-->
           ${items.map(item=>html`
                  <div class="character">
                    <img src=${item.imageUrl} alt="example1" />
                    <div class="hero-info">
                      <h3 class="category">${item.category}</h3>
                      <p class="description">${item.description}</p>
                      <a class="details-btn" href="/characters/${item._id}">More Info</a>
                    </div>
                  </div>
              `)}
              </section>
      ${items.length == 0
      ? html`
      <!-- Display an h2 if there are no posts -->
         <h2>No added Heroes yet.</h2>
      `
      :''
    }
`
export default async function dashBoardView(ctx) {
    const items = await getAll()

    ///////////////////////////////
    // let items = await getAll()
    // items=[] //testing case no items added
    ///////////////////////////////

    render(template(items))
}