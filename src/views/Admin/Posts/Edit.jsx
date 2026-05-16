import LayoutAdmin from '../../../layouts/Admin';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostsEdit = () => {
    document.title = 'Posts Edit - PT Ready Industries Indonesia';
    const navigate = useNavigate();
    const { id } = useParams();
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErros] = useState([]);
    const [categories, setCategories] = useState([]);
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const fetchDataCategories = async () => {
        try {
            setLoading(true);
            await Api.get('/api/admin/categories/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setCategories(response.data.data);
                setLoading(false);
            });
        } catch (error) {
            return error.message, setLoading(false);
        }
    };

    const fetchDataPost = async () => {
        try {
            setLoading(true);
            await Api.get(`/api/admin/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setTitle(response.data.data.title);
                setCategoryID(response.data.data.category_id);
                setContent(response.data.data.content);
            });
        } catch (error) {
            return error.message, setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataCategories();
        fetchDataPost();
        setLoading(false);
    }, []);

    const updatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('category_id', categoryID);
        formData.append('content', content);
        formData.append('_method', 'PUT');

        try {
            setLoading(true);
            await Api.post(`/api/admin/posts/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                navigate('/admin/posts');
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
                            <Link to="/admin/posts" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-pencil-alt"></i> Edit Post
                                    </h6>
                                    <hr />
                                    <form onSubmit={updatePost}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files[0])}
                                            />
                                        </div>
                                        {errors.image && <div className="alert alert-danger">{errors.image[0]}</div>}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Enter Title Post"
                                            />
                                        </div>
                                        {errors.title && <div className="alert alert-danger">{errors.title[0]}</div>}

                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Category</label>
                                            <select className="form-select" value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
                                                <option value="">-- Select Category --</option>
                                                {categories.map((category) => (
                                                    <option value={category.id} key={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.category_id && <div className="alert alert-danger">{errors.category_id[0]}</div>}

                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Content</label>
                                            <ReactQuill theme="snow" rows="5" value={content} onChange={(content) => setContent(content)} />
                                        </div>
                                        {errors.content && <div className="alert alert-danger">{errors.content[0]}</div>}
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

export default PostsEdit;
