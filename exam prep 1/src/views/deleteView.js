import { remove } from "../../api/itemsApi.js"
import page from "../../lib/page.js"

export default async function deleteView(ctx) {
    const itemId = ctx.params.itemId
    const isCofirmed = confirm('Are you sure you want to delete this item')

    if (!isCofirmed) {
        return
    }

    try {
        await remove(itemId)
        
        page.redirect('/dashboard')
    } catch (err) {
        alert(err.message)
    }
}