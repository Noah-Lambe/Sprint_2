// Title:  Final Sprint - Term 2
// Author: Noah Whiffen - SD12
// Dates:  December 7th, 2024 - December 8th, 2024 

import image from '../assets/images/annies_electronics.jpg';
import accountImage from '../assets/images/account_icon.png'
import shoppingBag from '../assets/images/shopping_bag.png'
import './Header.css';

function Header() {
    return(
        <header>
            <div className="topHeader">
                <img 
                className='headerImage'
                src={image}
                alt="Annie's Electronics Header"/>
                <a
                href='http://localhost:5173/accounts'
                className="headerLinks"
                >
                    <img src={accountImage}
                        className='IconImages'
                        alt='Account Icon'/>
                    My Account
                </a>
                <a 
                href='http://localhost:5173/cart'
                className="headerLinks">
                    <img src={shoppingBag}
                         className='IconImages'
                         alt='Shopping Bag Icon'/>
                    Bag
                </a>
            </div>
            <div className="bottomHeader">
                <nav>
                    <a
                    href='http://localhost:5173'
                    className='headerLinks'>
                        Shop
                    </a>
                    <a
                    href='#'
                    className='headerLinks'>
                        Support
                    </a>
                    <a
                    href='#'
                    className='headerLinks'>
                        About Us
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;