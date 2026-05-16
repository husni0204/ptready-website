import LayoutAdmin from '../../../layouts/Admin';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const UsersCreate = () => {
    document.title = 'Users Create - PT Ready Industries Indonesia';
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [rolesData, setRolesData] = useState([]);
    const [errors, setErros] = useState([]);
    const [roles, setRoles] = useState([]);
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const fetchDataRoles = async () => {
        try {
            setLoading(true);
            await Api.get('/api/admin/roles/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setRoles(response.data.data);
                setLoading(false);
            });
        } catch (error) {
            return error.message, setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataRoles();
        setLoading(false);
    }, []);

    const handleCheckboxChange = (e) => {
        let data = rolesData;
        data.push(e.target.value);
        setRolesData(data);
    };

    const storeUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await Api.post(
                '/api/admin/users',
                {
                    //data
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation,
                    roles: rolesData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            ).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                navigate('/admin/users');
                setLoading(false);
            });
        } catch (error) {
            setErros(error.response.data);
            setLoading(false);
        }
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/admin/users" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-user"></i> Create User
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeUser}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Enter Full Name"
                                                    />
                                                </div>
                                                {errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Email Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter Email Address"
                                                    />
                                                </div>
                                                {errors.email && <div className="alert alert-danger">{errors.email[0]}</div>}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Enter Password"
                                                    />
                                                </div>
                                                {errors.password && <div className="alert alert-danger">{errors.password[0]}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Password Confirmation</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={passwordConfirmation}
                                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                                        placeholder="Enter Password Confirmation"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mb-3">
                                            <label className="fw-bold">Roles</label>
                                            <br />
                                            {roles.map((role) => (
                                                <div className="form-check form-check-inline" key={Math.random()}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={role.name}
                                                        onChange={handleCheckboxChange}
                                                        id={`check-${role.id}`}
                                                    />
                                                    <label className="form-check-label fw-normal" htmlFor={`check-${role.id}`}>
                                                        {role.name}
                                                    </label>
                                                </div>
                                            ))}

                                            {errors.roles && <div className="alert alert-danger mt-2">{errors.roles[0]}</div>}
                                        </div>
                                        <div>
                                            {loading ? (
                                                <button type="button" disabled className="btn btn-tertiary me-2">
                                                    <i className="fa fa-save"></i>&nbsp;Loading ...
                                                </button>
                                            ) : (
                                                <button type="submit" className="btn btn-md btn-primary me-2">
                                                    <i className="fa fa-save"></i> Save
                                                </button>
                                            )}
                                            <button type="reset" className="btn btn-md btn-warning">
                                                <i className="fa fa-redo"></i> Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
};

export default UsersCreate;
