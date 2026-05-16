import LayoutAdmin from '../../../layouts/Admin';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../services/Api';
import toast from 'react-hot-toast';

const WebContactsCreate = () => {
    document.title = 'Contacts - PT Ready Industries Indonesia';
    const navigate = useNavigate();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [no_hp, setNo_hp] = useState('');
    const [teks_pesan, setTeks_pesan] = useState('');
    const [errors, setErros] = useState([]);
    const [loading, setLoading] = useState(false);

    const storeContact = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('email', email);
        formData.append('no_hp', no_hp);
        formData.append('teks_pesan', teks_pesan);

        try {
            setLoading(true);
            await Api.post('/api/public/contacts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                navigate('/public/contacts');
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
                            <Link to="/admin/contacts" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-pencil"></i> Tinggalkan Pesan
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeContact}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Nama</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={nama}
                                                onChange={(e) => setNama(e.target.value)}
                                                placeholder="Masukan Nama"
                                            />
                                        </div>
                                        {errors.nama && <div className="alert alert-danger">{errors.nama[0]}</div>}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Masukan Email"
                                            />
                                        </div>
                                        {errors.email && <div className="alert alert-danger">{errors.email[0]}</div>}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Nomor Handphone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={no_hp}
                                                onChange={(e) => setNo_hp(e.target.value)}
                                                placeholder="Masukan Nomor HP"
                                            />
                                        </div>
                                        {errors.no_hp && <div className="alert alert-danger">{errors.no_hp[0]}</div>}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Pesan</label>
                                            <textarea
                                                className="form-control"
                                                value={teks_pesan}
                                                onChange={(e) => setTeks_pesan(e.target.value)}
                                                placeholder="masukan pesan"
                                            >
                                            </textarea>
                                        </div>
                                        {errors.teks_pesan && <div className="alert alert-danger">{errors.teks_pesan[0]}</div>}
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

export default WebContactsCreate;
