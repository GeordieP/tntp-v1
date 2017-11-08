import { h } from 'hyperapp'

export default ({ pages }) =>
<ul id="pageList">
    {Object.keys(pages).map(key =>
        <a className="tile" href={ pages[key].url }>
            <li style={{ background: pages[key].color }} title={ pages[key].name }></li>
        </a>
    )}
</ul>

