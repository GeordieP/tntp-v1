import { app } from 'hyperapp'

import state from 'state/state'
import actions from 'actions/actions'
import view from 'components'

const dispatch = app({
    state,
    actions,
    view,
})

// get pages from webextension storage and update initial app state
if (typeof browser === "undefined") {
    console.error("No access to WebExtension API, changes will not be persisted")
} else {
    browser.storage.local.get("pages")
        .then(({ pages }) => {
            if (typeof pages === "undefined") return
            dispatch.setPages(pages)
        })
        .catch(e => console.error("error getting pages " + e))
}

