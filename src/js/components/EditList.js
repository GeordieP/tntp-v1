import { h } from 'hyperapp'

// components
import EditForm from "components/EditForm"

export default ({ pages, actions }) =>
<ul id="editList">
    <h1>Add Page</h1>
    <a className="tile">
        <li></li>
    <EditForm page={{}} newItem={true} savePage={actions.savePage} />
    </a>
    { Object.keys(pages).length ? <h1>Pages</h1> : null }
    {Object.keys(pages).map((key) =>
        <a className="tile">
            <li style={{ background: pages[key].color }} title={ pages[key].name }></li>
            <EditForm
                key={key}
                page={pages[key]}
                savePage={actions.savePage}
                deletePage={actions.deletePage}
            />
        </a>
    )}
</ul>

