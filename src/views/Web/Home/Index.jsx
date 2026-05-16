import { useEffect, useState } from 'react';
import LayoutWeb from '../../../layouts/Web';
import Slider from '../../../components/web/Slider';
import Api from '../../../services/Api';
import AlertDataEmpty from '../../../components/general/AlertDataEmpty';
import Loading from '../../../components/general/Loading';
import CardPostHome from '../../../components/general/cardPostHome';
import CardPhoto from '../../../components/general/CardPhoto';

const Home = () => {
    document.title = 'PT Ready Industries Indonesia';
    const [photos, setPhotos] = useState([]);
    const [loadingPhoto, setLoadingPhoto] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    const fetchDataPhotos = async (pageNumber = 1) => {
        setLoadingPhoto(true);
        const page = pageNumber ? pageNumber : pagination.currentPage;
        try {
            await Api.get(`/api/public/photos?page=${page}`).then((response) => {
                setPhotos(response.data.data.data);
                setPagination(() => ({
                    currentPage: response.data.data.current_page,
                    perPage: response.data.data.per_page,
                    total: response.data.data.total,
                }));
                setLoadingPhoto(false);
            });
        } catch (error) {
            return error.message, setLoadingPhoto(false);
        }
    };

    const fetchDataPosts = async () => {
        setLoadingPosts(true);
        try {
            await Api.get('/api/public/posts_home').then((response) => {
                setPosts(response.data.data);
                setLoadingPosts(false);
            });
        } catch (error) {
            return error.message, setLoadingPosts(false);
        }
    };

    useEffect(() => {
        fetchDataPhotos();
        fetchDataPosts();
    }, []);

    return (
        <LayoutWeb>
            <Slider />

            <div className="container mt-5 mb-3">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="section-title">
                            <h4>
                                <i className="fa-solid fa-camera-rotate"></i>
                                <strong style={{ color: 'rgb(209 104 0)' }}> GALLERY </strong>
                                READY INDUSTRIES
                            </h4>
                        </div>
                    </div>
                    {loadingPhoto ? (
                        <Loading />
                    ) : photos.length > 0 ? (
                        photos.map((photo) => (
                            <CardPhoto
                                key={photo.id}
                                image={photo.image}
                                caption={photo.caption}
                            />
                        ))
                    ) : (
                        <AlertDataEmpty />
                    )}
                </div>
            </div>

            <div className="container mt-2 mb-4">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="section-title">
                            <h4>
                                <i className="fa fa-book"></i>
                                <strong style={{ color: 'rgb(209 104 0)' }}> BERITA </strong>
                                TERBARU
                            </h4>
                        </div>
                    </div>
                    {loadingPosts ? (
                        <Loading />
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <CardPostHome
                                key={post.id}
                                image={post.image}
                                slug={post.slug}
                                title={post.title}
                                content={post.content}
                                user={post.user.name}
                                date={post.created_at}
                            />
                        ))
                    ) : (
                        <AlertDataEmpty />
                    )}
                </div>
            </div>
        </LayoutWeb>
    );
};

export default Home;
