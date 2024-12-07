import { getOne, endpointLikes } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import { getUserData } from "../../utils/userUtils.js";
import page from "../../lib/page.js"

const template = (item, likesCount,hasUserLikedItem,hasAccessToken, isOwner) => html`
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
              <h3>Like Solution:<span id="like">${likesCount}</span></h3>
              ${isOwner
                ? html`
                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                <a href="/solutions/${item._id}/edit" id="edit-btn">Edit</a>
                <a href="/solutions/${item._id}/delete" id="delete-btn">Delete</a>
                `
                :''
              }
              ${!isOwner && hasAccessToken && !hasUserLikedItem ? html`
              <div id="action-buttons">
                <!--Bonus - Only for logged-in users ( not authors )-->
                <a @click=${(e) => handleLikeClick(e, item._id)} href="#" id="like-btn">Like</a>
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
    const likesCount = await getLikeCount(itemId);
    const hasUserLikedItems = await getLikeInfo(itemId) === 1;
    // console.log(hasUserLikedItems);
    // console.log(isOwner);
    // console.log(userData.accessToken);
    
    
    
    
    
    render(template(item, likesCount, hasUserLikedItems, userData.accessToken, isOwner))
}



const getLikeCount = async (itemId) => {
  try {
      const response = await fetch(endpointLikes.getItemLikes(itemId));

      if (!response.ok) {
          throw new Error(`Failed to fetch like count: ${response.status}`);
      }

      const data = await response.json();
      return data;
  }
  catch (error) {
      console.error("Error fetching like count:", error);
      alert(error.message);
  }
}

const getLikeInfo = async (id) => {
  try {
      const response = await fetch(endpointLikes.hasUserLikedItem(id, localStorage.getItem('_id')));
      const data = await response.json();
      return data;
  }
  catch (error) {
      console.error("Error fetching like info:", error);
      alert(error.message);
  }
}

const handleLikeClick = async (e, itemId) => {
  e.preventDefault();

  try {
      const response = await fetch(endpointLikes.likeItem, {
          method: "POST",
          headers: {
              "X-Authorization": localStorage.getItem("accessToken"),
          },
          body: JSON.stringify({ solutionId: itemId }),
      });

      if (!response.ok) {
          throw new Error("Failed to like solution.");
      }

      page();
  }
  catch (error) {
      console.error("Error liking solution:", error);
      alert(error.message);
  }
}