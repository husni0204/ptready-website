import LayoutWeb from '../../../layouts/Web';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../services/Api';
import toast from 'react-hot-toast';

const WebContactsCreate = () => {
    document.title = 'Contacts - PT Ready Industries Indonesia';
    const navigate = useNavigate();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [nomor_hp, setNomor_hp] = useState('');
    const [teks_pesan, setTeks_pesan] = useState('');
    const [errors, setErros] = useState({});
    const [loading, setLoading] = useState(false);

    const storeContact = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await Api.post('/api/public/contact-us', {
                nama,
                email,
                nomor_hp,
                teks_pesan,
            }).then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                navigate('/');
                setLoading(false);
            });
        } catch (error) {
            setErros(error.response?.data?.errors ?? {});
            setLoading(false);
        }
    };

    return (
        <LayoutWeb>
            <main>
                <div className="container mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
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
                                                value={nomor_hp}
                                                onChange={(e) => setNomor_hp(e.target.value)}
                                                placeholder="Masukan Nomor HP"
                                            />
                                        </div>
                                        {errors.nomor_hp && <div className="alert alert-danger">{errors.nomor_hp[0]}</div>}
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
        </LayoutWeb>
    );
};

export default WebContactsCreate;
