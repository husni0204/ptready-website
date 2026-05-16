import LayoutAdmin from '../../../layouts/Admin';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const RolesEdit = () => {
    document.title = 'Edit Roles - PT Ready Industries Indonesia';
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [permissionsData, setPermissionsData] = useState([]);
    const [errors, setErros] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const fetchDataPermissions = async () => {
        try {
            await Api.get('/api/admin/permissions/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setPermissions(response.data.data);
            });
        } catch (error) {
            setErros(error.response.data);
        }
    };

    const fetchDataRoles = async () => {
        try {
            await Api.get(`/api/admin/roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setName(response.data.data.name);
                setPermissionsData(response.data.data.permissions.map((obj) => obj.name));
            });
        } catch (error) {
            setErros(error.response.data);
        }
    };

    useEffect(() => {
        fetchDataPermissions();
        fetchDataRoles();
    }, []);

    const handleCheckboxChange = (e) => {
        let data = permissionsData;
        if (data.some((name) => name === e.target.value)) {
            data = data.filter((name) => name !== e.target.value);
        } else {
            data.push(e.target.value);
        }
        setPermissionsData(data);
    };

    const updateRole = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await Api.post(
                `/api/admin/roles/${id}`,
                {
                    name: name,
                    permissions: permissionsData,
                    _method: 'PUT',
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
                navigate('/admin/roles');
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
                            <Link to="/admin/roles" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-shield-alt"></i> Edit Role
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateRole}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Role Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Role Name"
                                            />
                                        </div>
                                        {errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
                                        <hr />
                                        <div className="mb-3">
                                            <label className="fw-bold">Permissions</label>
                                            <br />
                                            {permissions.map((permission) => (
                                                <div className="form-check form-check-inline" key={Math.random()}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={permission.name}
                                                        defaultChecked={permissionsData.some((name) => name === permission.name && true)}
                                                        onChange={handleCheckboxChange}
                                                        id={`check-${permission.id}`}
                                                    />
                                                    <label className="form-check-label fw-normal" htmlFor={`check-${permission.id}`}>
                                                        {permission.name}
                                                    </label>
                                                </div>
                                            ))}
                                            {errors.permissions && <div className="alert alert-danger mt-2">{errors.permissions[0]}</div>}
                                        </div>
                                        <div>
                                            {loading ? (
                                                <button type="button" disabled className="btn btn-tertiary me-2">
                                                    <i className="fa fa-save"></i>&nbsp;Loading ...
                                                </button>
                                            ) : (
                                                <button type="submit" className="btn btn-md btn-primary me-2">
                                                    <i className="fa fa-save"></i> Update
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

export default RolesEdit;
