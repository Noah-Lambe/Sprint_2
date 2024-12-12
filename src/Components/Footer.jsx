// Title:  Final Sprint - Term 2
// Author: Jonathan Strickland - SD12
// Dates:  December 8th, 2024

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div>
                <p>Email: annieselectronics@email.com</p>
                <p>Phone: (709) 555-1234</p>
            </div>

            <div>
                <p>Annie&apos;s Electonics</p>
                <p>Copyright &copy; 2024</p>
            </div>

            <div>
                <p>
                    <a href="http://facebook.com" target="_blank">
                        <FaFacebook />
                    </a>
                    <a href="http://twitter.com" target="_blank">
                        <FaTwitter />
                    </a>
                    <a href="http://instagram.com" target="_blank">
                        <FaInstagram />
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;