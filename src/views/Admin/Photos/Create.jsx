import { useState } from 'react';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const PhotosCreate = (props) => {
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState({});
    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const storePhoto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);

        try {
            setLoading(true);
            await Api.post('/api/admin/photos', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                document.getElementById('file').value = '';
                setImage('');
                setCaption('');
                setErrors({});
                props.fetchData();
                setLoading(false);
            });
        } catch (error) {
            console.log("ini errornya :", error.response?.data);
            setErrors(error.response?.data?.errors ?? {});
            setLoading(false);
        }
    };

    return (
        <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-body">
                <form onSubmit={storePhoto}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Image</label>
                        <input type="file" id="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    {errors.image && <div className="alert alert-danger">{errors.image[0]}</div>}

                    <div className="mb-3">
                        <label className="form-label fw-bold">Caption</label>
                        <input
                            type="text"
                            id="caption"
                            className="form-control"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Enter Title Photo"
                        />
                    </div>
                    {errors.caption && <div className="alert alert-danger">{errors.caption[0]}</div>}
                    <div>
                        {loading ? (
                            <button type="button" disabled className="btn btn-tertiary me-2">
                                <i className="fa fa-save"></i>&nbsp;Loading ...
                            </button>
                        ) : (
                            <>
                                <button type="submit" className="btn btn-md btn-primary me-2">
                                    <i className="fa fa-save"></i> Upload
                                </button>
                                <button type="reset" className="btn btn-md btn-warning">
                                    <i className="fa fa-redo"></i> Reset
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PhotosCreate;
