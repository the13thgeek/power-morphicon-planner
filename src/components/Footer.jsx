import Readt from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
        <p><b>Disclaimer:</b> The data displayed on this page is sourced directly from the <b>Official Power Morphicon website</b>. We do not verify the accuracy of the information provided by PMC. Therefore, this service will not responsible for any errors, inaccuracies, or discrepancies in the data. The information is provided "as is," and we recommend verifying details directly with PMC for the most accurate and up-to-date information.</p>
        <p className='copyright'>Copyright &copy; {(new Date().getFullYear())} the13thgeek&trade;. All rights reserved.</p>
        <p>v0.5.0</p>
    </footer>
  )
}

export default Footer