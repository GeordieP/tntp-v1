import { h } from 'hyperapp'

// components
import EditForm from "components/EditForm"

export default ({ pages }) =>
<ul id="editList">
    <h1>Add New</h1>
    <a className="tile">
        <li></li>
        <EditForm key={pages.length} />
    </a>
    <h1>Pages</h1>
    {pages.map((page, index) =>
        <a className="tile">
            <li style={{ background: page.color }} title={ page.name }></li>
            <EditForm key={index} page={page} />
        </a>
    )}
</ul>

