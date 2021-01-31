import React from 'react'

const TabNav = (props) => {
  return (
    <>
      <div className='tabs is-centered is-large'>
        <ul>
        {
          props.tabs.map(tab => {
            // if the tab is active make it active
            const active = (tab === props.selected ? 'active ' : '' );
            return (
              // return the tab which is active
              <li className="nav-item" key={ tab }>
                {/* on click set the tab to the tab you just clicked */}
                <a className={"nav-link " + active} onClick={ () => props.setSelected(tab) }>
                  {/* tab name */}
                  { tab }
                </a>
              </li>
            );
          })
        }
        </ul>
      </div>
      <div>
      {props.children}
      </div>
    </>
  )
}

export default TabNav
