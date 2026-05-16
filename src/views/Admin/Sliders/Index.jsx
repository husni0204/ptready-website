import LayoutAdmin from '../../../layouts/Admin';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import hasAnyPermission from '../../../utils/Permissions';
import Pagination from '../../../components/general/Pagination';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import SlidersCreate from './Create';

const SlidersIndex = () => {
    document.title = 'Sliders - PT Ready Industries Indonesia';
    const [sliders, setSliders] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    const token = Cookies.get('token');
    const [loading, setLoading] = useState(false);

    const fetchData = async (pageNumber = 1, keywords = '') => {
        const page = pageNumber ? pageNumber : pagination.currentPage;
        try {
            setLoading(true);
            await Api.get(`/api/admin/sliders?search=${keywords}&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setSliders(response.data.data.data);
                setPagination({
                    currentPage: response.data.data.current_page,
                    perPage: response.data.data.per_page,
                    total: response.data.data.total,
                });
                setLoading(false);
            });
        } catch (error) {
            return error.message, setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setLoading(false);
    }, []);

    const deleteSlider = async (id) => {
        confirmAlert({
            title: 'Anda Yakin ?',
            message: 'Data yang di hapus tidak dapat dikembalikan',
            buttons: [
                {
                    label: 'Ya',
                    onClick: async () => {
                        try {
                            setLoading(true);
                            await Api.delete(`/api/admin/sliders/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }).then((response) => {
                                toast.success(response.data.message, {
                                    position: 'top-right',
                                    duration: 4000,
                                });
                                fetchData();
                                setLoading(false);
                            });
                        } catch (error) {
                            return error.message, setLoading(false);
                        }
                    },
                },
                {
                    label: 'Tidak',
                    onClick: () => {},
                },
            ],
        });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">{hasAnyPermission(['sliders.create']) && <SlidersCreate fetchData={fetchData} />}</div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-centered mb-0 rounded">
                                            <thead className="thead-dark">
                                                <tr className="border-0">
                                                    <th className="border-0" style={{ width: '5%' }}>
                                                        No.
                                                    </th>
                                                    <th className="border-0">Image</th>
                                                    <th className="border-0" style={{ width: '15%' }}>
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    //cek apakah data ada
                                                    sliders.length > 0 && loading === false ? (
                                                        //looping data "sliders" dengan "map"
                                                        sliders.map((slider, index) => (
                                                            <tr key={index}>
                                                                <td className="fw-bold text-center">
                                                                    {++index + (pagination.currentPage - 1) * pagination.perPage}
                                                                </td>
                                                                <td className="text-center">
                                                                    <img src={slider.image} width={'300px'} className="rounded" />
                                                                </td>
                                                                <td className="text-center">
                                                                    {hasAnyPermission(['sliders.delete']) && (
                                                                        <button
                                                                            onClick={() => deleteSlider(slider.id)}
                                                                            className="btn btn-danger btn-sm"
                                                                        >
                                                                            <i className="fa fa-trash"></i>
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        //tampilkan pesan data belum tersedia
                                                        <tr>
                                                            <td colSpan={5}>
                                                                <div className="text-center">
                                                                    <div
                                                                        className="alert alert-danger text-center spinner-border text-danger"
                                                                        role="alert"
                                                                    ></div>
                                                                    <br />
                                                                    <span className="text-danger">Data Belum Tersedia!.</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        perPage={pagination.perPage}
                                        total={pagination.total}
                                        onChange={(pageNumber) => fetchData(pageNumber)}
                                        position="end"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
};

export default SlidersIndex;
