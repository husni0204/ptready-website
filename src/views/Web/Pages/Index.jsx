import { useState, useEffect } from 'react';
import LayoutWeb from '../../../layouts/Web';
import Api from '../../../services/Api';
import AlertDataEmpty from '../../../components/general/AlertDataEmpty';
import Loading from '../../../components/general/Loading';
import CardPage from '../../../components/general/CardPage';

const WebPagesIndex = () => {
    document.title = 'Postingan PT Ready Industries Indonesia';
    const [pages, setPages] = useState([]);
    const [loadingPages, setLoadingPages] = useState(true);

    const fetchDataPages = async () => {
        setLoadingPages(true);
        try {
            await Api.get('/api/public/pages').then((response) => {
                setPages(response.data.data);
                setLoadingPages(false);
            });
        } catch (error) {
            return error.message, setLoadingPages(false);
        }
    };

    //hook useEffect
    useEffect(() => {
        fetchDataPages();
    }, []);

    return (
        <LayoutWeb>
            <div className="container mt-4 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-uppercase">
                            <i className="fa fa-info-circle"></i> POSTINGAN READY INDUSTRIES INDONESIA
                        </h5>
                        <hr />
                    </div>
                </div>
                <div className="row mt-4">
                    {loadingPages ? (
                        <Loading />
                    ) : pages.length > 0 ? (
                        pages.map((page) => <CardPage key={page.id} title={page.title} slug={page.slug} />)
                    ) : (
                        <AlertDataEmpty />
                    )}
                </div>
            </div>
        </LayoutWeb>
    );
};

export default WebPagesIndex;
