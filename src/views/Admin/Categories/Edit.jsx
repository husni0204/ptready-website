import LayoutAdmin from '../../../layouts/Admin';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

const CategoriesEdit = () => {
    document.title = 'Edit Categories - PT Ready Industries Indonesia';
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [errors, setErros] = useState([]);
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const fetchDataCategory = async () => {
        try {
            setLoading(true);
            await Api.get(`/api/admin/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setName(response.data.data.name);
                setLoading(false);
            });
        } catch (error) {
            setErros(error.response.data);
        }
    };

    useEffect(() => {
        fetchDataCategory();
    }, []);

    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await Api.post(
                `/api/admin/categories/${id}`,
                {
                    //data
                    name: name,
                    _method: 'PUT',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'multipart/form-data',
                    },
                },
            ).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                //redirect
                navigate('/admin/categories');
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
                            <Link to="/admin/categories" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-shield-alt"></i> Create Category
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateCategory}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Category Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Category Name"
                                            />
                                        </div>
                                        {errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
                                        <hr />
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

export default CategoriesEdit;
