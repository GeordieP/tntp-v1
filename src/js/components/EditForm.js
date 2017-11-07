import { h } from 'hyperapp'

export default ({ key, page }) => {
    let newItem = false

    if (!page) {
        page = {}
        newItem = true
    }

    return (
        <div className="editForm">
            <input type="text" placeholder="Name..." value={ page.name || ""} />
            <input type="text" placeholder="URL..." value={ page.url || "" } />
            <input type="text" placeholder="Color..." value={ page.color || ""} />
            <button onclick="">
              { newItem ? "Add" : "Save" }
            </button>
        </div>
    )
}
