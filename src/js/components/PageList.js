import { h } from 'hyperapp'

export default ( {pages} ) =>
<ul id="pageList">
    {pages.map(page => (
        <a href={ page.url }>
            <li style={{ background: page.color }} title={ page.name }></li>
        </a>
    ))}
</ul>

