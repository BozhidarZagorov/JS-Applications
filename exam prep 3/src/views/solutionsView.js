import { getAll } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";

const template = (items) => html`
    <!-- Dashboard page -->
  <h2>Solutions</h2>
      <!-- Display a div with information about every post (if any)-->
    <section id="solutions">
      ${items.map(item=>html`
      <div class="solution">
        <img src=${item.imageUrl} alt="example1" />
          <div class="solution-info">
            <h3 class="type">${item.type}</h3>
            <p class="description">
              ${item.description}
            </p>
            <a class="details-btn" href="/solutions/${item._id}">Learn More</a>
          </div>
      </div>
      `)}
    </section>
    ${items.length == 0
      ? html`
      <!-- Display an h2 if there are no posts -->
    <h2 id="no-solution">No Solutions Added.</h2>
      `
      :''
    }
    
`
export default async function solutionsView(ctx) {
    const items = await getAll()

    render(template(items))
}