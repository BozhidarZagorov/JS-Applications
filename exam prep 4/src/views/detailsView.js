import { getOne, getLikesByCharId, likeChar } from "../../api/itemsApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";
import { getUserData } from "../../utils/userUtils.js";

const template = (item,isOwner,hasUser,hasLiked,likes,onLike) => html`
<!-- Details page -->
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <div>
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${item.description}</p>
                   <p id ="more-info">${item.moreInfo}</p>
              </div>
            </div>
              <h3>Is This Useful:<span id="likes">${likes}</span></h3>
              ${hasUser ? html `
                <div id="action-buttons">
                  ${isOwner
                ?
                html`
                <!--Edit and Delete are only for creator-->
                <a href="/characters/${item._id}/edit" id="edit-btn">Edit</a>
                <a href="/characters/${item._id}/delete" id="delete-btn">Delete</a>
                `
                :''
                }
                ${hasLiked ? ''
                :
                html`
                <!--Bonus - Only for logged-in users ( not authors )-->
                </div>
                <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
                `}
                  `
                :''}
            </div>
        </div>
      </section>
`
export default async function detailsView(ctx) {
    const itemId  = ctx.params.itemId
    // const item = await getOne(itemId)

    const [item,likesInfo] = await Promise.all([
      getOne(itemId),
      getLikesByCharId(itemId)
    ]) 

    console.log(likesInfo);
    
    
    const userData = getUserData()
    const isOwner = userData._id === item._ownerId
    // console.log(isOwner);


 
    

    const hasLiked= likesInfo.hasLiked || isOwner  
    // console.log(hasLiked);
    

    
    async function onLike() {
        await likeChar(itemId)

        page.redirect(`/characters/${item._id}`)
    }
    
    render(template(item,isOwner,Boolean(userData),hasLiked,likesInfo.likes,onLike))
}