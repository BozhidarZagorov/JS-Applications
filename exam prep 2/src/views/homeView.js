import { render,html } from "../../lib/lit-html.js";

const template = () => html`
     <!-- Home Page -->
     <section id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img class="hero" src="/images/car-png.webp" alt="carIntro">
                <h2>To see all the listings click the link below:</h2>
                <div>
                    <a href="/catalog" class="button">Listings</a>
                </div>
            </div>
        </section>
`
export default async function HomeView(ctx) {
    render(template())
}