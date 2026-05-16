import { useState } from 'react';
import Api from '../../services/Api';
import LayoutAuth from '../../layouts/Auth';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    //title page
    document.title = 'Login | PT Ready Industries Indonesia';
    //navigate
    const navigate = useNavigate();
    //define state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //define error
    const [errors, setErrors] = useState([]);
    // loading progress
    const [loading, setLoading] = useState(false);

    //method login
    const login = async (e) => {
        setLoading(true);
        e.preventDefault();

        await Api.post('/api/login', {
            //data
            email: email,
            password: password,
        })
            .then((response) => {
                //set token
                Cookies.set('token', response.data.token);
                //set user to cookies
                Cookies.set('user', JSON.stringify(response.data.user));
                //set permissions to cookies
                Cookies.set('permissions', JSON.stringify(response.data.permissions));
                //show toast
                toast.success('Login Berhasil!', {
                    position: 'top-right',
                    duration: 4000,
                });
                setLoading(false);
                //redirect
                navigate('/admin/dashboard');
            })
            .catch((error) => {
                //set response error to state
                setErrors(error.response.data);
                setLoading(false);
            });
    };

    //check if cookie already exists
    if (Cookies.get('token')) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <LayoutAuth>
            <div
                className="row d-flex align-items-center justify-content-center"
                style={{
                    marginTop: '50px',
                }}
            >
                <div className="col-md-7">
                    <div className="text-center mb-5">
                        <img src={'/images/logo_ready.png'} width={'100'} alt="logo" />
                        <h4 className="mt-3">
                            <strong className="text-primary mt-3">READY INDUSTRIES</strong>
                        </h4>
                    </div>
                    <div className="card rounded-4 shadow-sm border-top-success">
                        <div className="card-body">
                            <div className="form-left h-100 py-3 px-3">
                                {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                                <form onSubmit={login} className="row g-4">
                                    <div className="col-12">
                                        <label>Email Address</label>
                                        <div className="input-group">
                                            <div className="input-group-text bg-primary">
                                                <i className="fa fa-envelope"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Masukan Email Anda disini!"
                                            />
                                        </div>
                                        {errors.email && <div className="alert alert-danger mt-2">{errors.email}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label>Password</label>
                                        <div className="input-group">
                                            <div className="input-group-text bg-primary">
                                                <i className="fa fa-lock"></i>
                                            </div>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Masukan Password Anda disini!"
                                            />
                                        </div>
                                        {errors.password && <div className="alert alert-danger mt-2">{errors.password}</div>}
                                    </div>
                                    {loading ? (
                                        <button type="button" disabled className="btn btn-tertiary px-4 float-end">
                                            <span className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true"></span>
                                            &nbsp; Loading ...
                                        </button>
                                    ) : (
                                        <button type="submit" className="btn btn-outline-primary px-4 float-end rounded-4">
                                            LOGIN
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAuth>
    );
};

export default Login;
