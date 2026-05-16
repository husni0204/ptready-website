import LayoutAdmin from '../../../layouts/Admin';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PagesCreate = () => {
    document.title = 'Pages Create - PT Ready Industries Indonesia';
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErros] = useState([]);
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const storePage = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await Api.post(
                '/api/admin/pages',
                {
                    title: title,
                    content: content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            ).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                navigate('/admin/pages');
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
                            <Link to="/admin/pages" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-pencil-alt"></i> Create Page
                                    </h6>
                                    <hr />
                                    <form onSubmit={storePage}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Enter Title Page"
                                            />
                                        </div>
                                        {errors.title && <div className="alert alert-danger">{errors.title[0]}</div>}

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

export default PagesCreate;
