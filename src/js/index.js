import { app } from 'hyperapp'

import state from 'state/state'
import view from 'components'

const dispatch = app({
    state,
    actions: {},
    view,
})

