import { getByYear } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";


const template = (items,onSearchChange,onSearchClick) => html `
        <!-- Search Page -->
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year" @input=${onSearchChange}>
                <button @click=${onSearchClick} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">
                ${items.map(item =>html`
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
                    html`
                        <!-- Display if there are no matches -->
                        <p class="no-cars"> No results.</p>
                    `
                    :''
                }
            </div>
        </section>
`

export default async function searchByYearView(ctx) {
    let currentSearch = ''
    const onSearchChange = (e)=>{
        currentSearch = e.target.value
    }
    let items = []
    const onSearchClick= async (e) =>{
        currentSearch=Number(currentSearch)

        items = await getByYear(currentSearch)
        render(template(items,onSearchChange,onSearchClick))
    }


    render(template(items,onSearchChange,onSearchClick))
}