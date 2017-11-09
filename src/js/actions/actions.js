export default {
    toggleEdit: ({ editMode }) => ({ editMode: !editMode }),

    savePage: ({ pages }, _, { key, newItem, page }) => {
        if (!page.url) {
            alert("Save failed: No URL provided")
            return
        }

        if (!page.name) {
            if (!confirm("No page name given, continue with default 'NO_NAME'?"))
                return

            page.name = "NO_NAME"
        }

        // if this is a new page, create a key
        if (newItem) { key = Date.now() }

        let newPages = Object.assign({}, pages)
        // update or replace object at key
        newPages[key] = page
        return ({ pages: newPages })
    },

    deletePage: ({ pages }, _, key) => {
        if (!pages[key]) {
            alert("Something went wrong. No page exists with the given key.")
        } else if (confirm("Delete " + pages[key].name + "? There is no undo.")) {
            let newPages = Object.assign({}, pages)
            delete newPages[key]
            return { pages: newPages }
        }
    }
}

