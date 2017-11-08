export default {
    toggleEdit: ({ editMode }) => ({ editMode: !editMode }),

    savePage: ({ pages }, _, { key, newItem, page }) => {
        if (newItem) { key = Date.now() }
        let newPages = Object.assign({}, pages)
        // update or replace object at key
        newPages[key] = page
        return ({ pages: newPages })
    },
    deletePage: ({ pages }, _, key) => {
        // if page key exists, delete it
        if (pages[key]) {
            let newPages = Object.assign({}, pages)
            delete newPages[key]
            return { pages: newPages }
        }

        return { pages }
    }
}

