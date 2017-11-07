import { h } from 'hyperapp'

export default ( {pages} ) =>
<ul id="pageList">
    {pages.map(page =>
        <a className="tile" href={ page.url }>
            <li style={{ background: page.color }} title={ page.name }></li>
        </a>
    )}
</ul>

