import '../assets/admin/css/styles.css';
import '../assets/web/css/custom.css';
import '../assets/admin/js/bootstrap.bundle.min.js';
import Navbar from '../components/web/Navbar';
import Footer from '../components/web/Footer';

const Web = ({ children }) => {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: "100vh" }}>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Web;
