export default {
    toggleEdit: ({ editMode }) => ({ editMode: !editMode }),

    savePage: ({ pages }, _, { key, newItem, page }) => {
        if (newItem) { key = Date.now() }
        let newPages = Object.assign({}, pages)
        // update or replace key
        newPages[key] = page
        return ({ pages: newPages })
    }
}
