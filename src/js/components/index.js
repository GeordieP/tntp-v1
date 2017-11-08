import { h } from 'hyperapp'

import PageList from 'components/PageList'
import EditList from 'components/EditList'

export default (state, actions) =>
state.editMode ? (
    <main>
        <a href="#" id="backBtn" title="Back" onclick={actions.toggleEdit}>Back</a>
        <EditList pages={state.pages} actions={actions} />
    </main>
) : (
    <main>
        <a href="#" id="settingsBtn" title="Settings" onclick={actions.toggleEdit}>-</a>
        <PageList pages={state.pages} />
    </main>
)

