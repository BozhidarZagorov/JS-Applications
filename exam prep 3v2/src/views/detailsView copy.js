import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js"


{/* <h3>Like Solution:<span id="like">${likesCount}</span></h3> */}


{/* <a @click=${(e) => handleLikeClick(e, data._id)} href="#" id="like-btn">Like</a> */}


    const likesCount = await getLikeCount(id);
    const hasUserLikedItems = await getLikeInfo(id) === 1;

    render(template(data, likesCount, hasUserLikedItems), rootEl);

const getLikeInfo = async (id) => {
    try {
        const response = await fetch(endpoints.hasUserLikedItem(id, localStorage.getItem("userId")));
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching like info:", error);
        alert(error.message);
    }
}

const handleLikeClick = async (e, id) => {
    e.preventDefault();

    try {
        const response = await fetch(endpoints.likeItem, {
            method: "POST",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ solutionId: id }),
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