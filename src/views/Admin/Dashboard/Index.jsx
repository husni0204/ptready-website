import { useEffect, useState } from 'react';
import LayoutAdmin from '../../../layouts/Admin';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    //title page
    document.title = 'Dashboard | PT Ready Industries Indonesia';

    //init state
    const [countCategories, setCountCategories] = useState(0);
    const [countPosts, setCountPosts] = useState(0);
    const [countContacts, setCountContacts] = useState(0);
    

    //token from cookies
    const token = Cookies.get('token');

    //hook useEffect
    useEffect(() => {
        //fetch api
        Api.get('/api/admin/dashboard', {
            //headers
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set data
            console.log('data dashboard :',response.data.data);
            setCountCategories(response.data.data.categories);
            setCountPosts(response.data.data.posts);
            setCountContacts(response.data.data.contacts);
        });
    }, [token]);

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid px-4 mt-5">
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                                <div className="card-body">
                                    <strong>{countCategories}</strong> CATEGORIES
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to="/admin/categories">
                                        View Details
                                    </Link>
                                    <div className="small text-white">
                                        <i className="fas fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4 border-0 shadow-sm">
                                <div className="card-body">
                                    <strong>{countPosts}</strong> POSTS
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to="/admin/posts">
                                        View Details
                                    </Link>
                                    <div className="small text-white">
                                        <i className="fas fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4 border-0 shadow-sm">
                                <div className="card-body">
                                    <strong>{countContacts}</strong> CONTACTS
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to="/admin/contacts">
                                        View Details
                                    </Link>
                                    <div className="small text-white">
                                        <i className="fas fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
};

export default Dashboard;
