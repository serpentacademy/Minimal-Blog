import {Link} from 'react-router-dom'
import "./css/menu.css"
function Menu() {
    return (
      <>
  <div className="header">
  
  <div className="header-menu">
   <a className="menu-link is-active" href="#">Serpent</a>
   <a className="menu-link notify" href="#">Categories</a>
   <a className="menu-link" href="#">Discover</a>
   <a className="menu-link notify" href="#">Labels</a>
  </div>
  <div className="search-bar">
   <input type="text" placeholder="Search Blog" />
  </div>
  <div className="header-profile">
   <div className="notification">
    <span className="notification-number">3</span>
   </div>
   <img className="profile-img" src="https://www.arweave.net/7ZqQwuYOWpy8a5hcDkMPQ8XiSBQgEi1vJAobx4U-7rE?ext=gif&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="" />
  </div>
 </div>
      </>
    );
  }
  export default Menu;