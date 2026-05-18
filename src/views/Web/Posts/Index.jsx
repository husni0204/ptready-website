import { useState, useEffect } from 'react';
import LayoutWeb from '../../../layouts/Web';
import Api from '../../../services/Api';
import AlertDataEmpty from '../../../components/general/AlertDataEmpty';
import Loading from '../../../components/general/Loading';
import CardPost from '../../../components/general/CardPost';
import Pagination from '../../../components/general/Pagination';

const WebPostsIndex = () => {
    document.title = 'Berita PT Ready Industries Indonesia';

    const [posts, setPosts] = useState([]);
    const [loadingPost, setLoadingPost] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    const fetchDataPosts = async (pageNumber = 1) => {
        setLoadingPost(true);
        const page = pageNumber ? pageNumber : pagination.currentPage;
        try {
            await Api.get(`/api/public/posts?page=${page}`).then((response) => {
                setPosts(response.data.data.data);
                setPagination(() => ({
                    currentPage: response.data.data.current_page,
                    perPage: response.data.data.per_page,
                    total: response.data.data.total,
                }));
                setLoadingPost(false);
            });
        } catch (error) {
            return error.message;
        }
    };

    useEffect(() => {
        fetchDataPosts();
    }, []);

    return (
        <LayoutWeb>
            <div className="container mt-4 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-uppercase">
                            <i className="fa fa-book"></i> BERITA READY INDUSTRIES INDONESIA
                        </h5>
                        <hr />
                    </div>
                </div>
                <div className="row mt-4">
                    {loadingPost ? (
                        <Loading />
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <CardPost
                                key={post.id}
                                image={post.image}
                                slug={post.slug}
                                title={post.title}
                                content={post.content}
                                date={post.created_at}
                            />
                        ))
                    ) : (
                        <AlertDataEmpty />
                    )}
                </div>
                <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchDataPosts(pageNumber)}
                    position="center"
                />
            </div>
        </LayoutWeb>
    );
};

export default WebPostsIndex;
