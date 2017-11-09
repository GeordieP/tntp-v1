function persistSavePages(pages) {
    if (typeof browser === "undefined")
        return

    browser.storage.local.set({ pages })
        .then(() => {})
        .catch(e => console.error("error saving pages to browser storage\n" + e))
}

export default {
    // replace entire pages object
    setPages: (_, __, pages) => ({ pages }),

    // toggle edit mode; causes edit view to be rendered
    toggleEdit: ({ editMode }) => ({ editMode: !editMode }),

    // use given data to overwrite an existing page at key, or create a new page
    savePage: ({ pages }, _, { key, newItem, page }) => {
        // dont allow a page to be saved with no URL
        if (!page.url) {
            alert("Save failed: No URL provided")
            return
        }

        // if no name is given, ask user if they'd like to use default
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

        // update browser storage
        persistSavePages(newPages)

        // update state
        return { pages: newPages }
    },

    // delete page at key if it exists
    // ask for confirmation first
    deletePage: ({ pages }, _, key) => {
        if (!pages[key]) {
            alert("Something went wrong. No page exists with the given key.")
        } else if (confirm("Delete " + pages[key].name + "? There is no undo.")) {
            let newPages = Object.assign({}, pages)
            delete newPages[key]

            // update browser storage
            persistSavePages(newPages)

            return { pages: newPages }
        }
    }
}

