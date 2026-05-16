import 'bootstrap/dist/css/bootstrap.min.css';
//import "../assets/admin/css/custom.css";

import '@fortawesome/fontawesome-free/js/all.js';

const auth = ({ children }) => {
    return (
        <div
            style={{
                backgroundImage: 'url(/images/bg_new.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100vh',
            }}
        >
            <div className="container">
                <div className="d-flex justify-content-center h-100">{children}</div>
            </div>
        </div>
    );
};

export default auth;
