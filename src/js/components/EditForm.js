import { h } from 'hyperapp'

export default ({ key, page, newItem, savePage, deletePage }) => {
    if (newItem) {
        key = "NEW"
    }

    let inputName = key + "_name"
    let inputUrl = key + "_url"
    let inputColor = key + "_color"

    let onSubmit = function({ originalTarget }) {
        savePage({
            key,
            // undefined is falsy, but give the action a boolean for more predictable behavior
            newItem: newItem || false, 
            page: {
                // default name "NO NAME"
                name: originalTarget[inputName].value || "NO NAME",
                url: originalTarget[inputUrl].value,
                // default color 1f1f1f
                color: originalTarget[inputColor].value || "#1f1f1f"
            }
        })
    }

    return (
        <form className="editForm" onsubmit={onSubmit} action={ "#" + inputName }>
            <input id={ inputName } type="text" placeholder="Name..." value={ page.name || ""} />
            <input id={ inputUrl } type="text" placeholder="URL..." value={ page.url || "" } />
            <input id={ inputColor } type="text" placeholder="Color..." value={ page.color || ""} />
            <div className="flex">
                <input className="submitBtn" type="submit" value={ newItem ? "Add" : "Save" } />
                { newItem ? null :
                    <input className="deleteBtn" type="button" value="Delete" onclick={deletePage.bind(null, key)} />
                }
            </div>
        </form>
    )
}
