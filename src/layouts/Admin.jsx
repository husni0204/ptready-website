import '../assets/admin/css/styles.css';
import '../assets/admin/css/custom.css';

import '../assets/admin/js/bootstrap.bundle.min.js';
import { Sidebar, Navbar } from '../components/admin/';

const admin = ({ children }) => {
    return (
        <>
            <Navbar />
            <div id="layoutSidenav" className="mt-5">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>

                <div id="layoutSidenav_content">
                    {children}

                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-end small">
                                <div className="text-muted">Copyright &copy; PT READY INDSTRIES INDONESIA.</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default admin;
