import { h } from 'hyperapp'

import PageList from 'components/PageList'

export default (state, actions) =>
<main>
    <a href="#" id="settingsBtn" title="Settings">-</a>
    <PageList pages={state.pages} />
</main>

