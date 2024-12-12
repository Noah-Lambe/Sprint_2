// Title:  Final Sprint - Term 2
// Author: Jonathan Strickland - SD12
// Dates:  December 8th, 2024 

import image from '../assets/images/annies_electronics.jpg';
import saleimage from '../assets/images/laptopsale.png'
import macbook from '../assets/images/macbook.png'
import iphone from '../assets/images/iphone.png'
import applewatch from '../assets/images/applewatch.png'
import beats from '../assets/images/beats.png'
import './MainContent.css'

function MainContent() {
    return (
        <main className="main-content">
            <div className="box">
                <div className="small-box">
                    <img className="bannerimg"
                    src={image}
                    alt="Annie's Electronics Header"/>
                    <p>
                        Browse Our Store!
                    </p>
                    <a href='#' className='box-links'>
                        New Arrivals
                    </a>
                    <a href='#' className='box-links'>
                        Shop
                    </a>
                    <a href='#' className='box-links'>
                        Sales
                    </a>
                    <a href='#' className='box-links'>
                        Service
                    </a>
                    <img className="saleimg"
                    src={saleimage}
                    alt="Holiday Sale"/>
                </div>
                <div className="large-box">
                <div className="container">
                    <h1 className="title">New Arrivals</h1>
                    <div className="image-grid">
                        <div className="image-item">
                            <img src={macbook} alt="Macbook Pro" />
                            <p className="description">Apple MacBook Pro 14.2in - Space Grey Apple M3/ 512GB SSD / 8GB RAM</p>
                            <p className="description">$1699.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                        <div className="image-item">
                            <img src={iphone} alt="iPhone 16 Plus" />
                            <p className="description">Apple iPhone 16 Plus 512GB - Black - Unlocked</p>
                            <p className="description">$1629.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                        <div className="image-item">
                            <img src={applewatch} alt="Macbook Pro" />
                            <p className="description">Apple Watch Series 10 GPS + Cellular, 46mm Jet Black Aluminium Case with Black Sport Band - M/L</p>
                            <p className="description">$718.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                        <div className="image-item">
                            <img src={beats} alt="Macbook Pro" />
                            <p className="description">Beats By Dr. Dre Studio Pro Over-Ear Noise Cancelling Bluetooth Headphones - Black</p>
                            <p className="description">$249.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainContent;