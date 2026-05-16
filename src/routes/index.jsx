import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

import { Forbidden, Login } from '../views/Auth';
import {
    Dashboard,
    PermissionsIndex,
    RolesIndex,
    CreateRoles,
    RolesEdit,
    UsersIndex,
    UsersCreate,
    UsersEdit,
    CategoriesIndex,
    CategoriesCreate,
    CategoriesEdit,
    PostsIndex,
    PostsCreate,
    PostsEdit,
    PagesIndex,
    PagesCreate,
    PagesEdit,
    PhotosIndex,
    SlidersIndex,
    ContacsIndex,
} from '../views/Admin/';
import {
    Home,
    WebContactsCreate,
    WebPagesIndex,
    WebPagesShow,
    WebPhotosIndex,
    WebPostsIndex,
    WebPostsShow,
} from '../views/Web';

const RoutesIndex = () => {
    return (
        <Routes>
            {/* route "/login" */}
            <Route path="/login" element={<Login />} />

            {/* route "/login" */}
            <Route path="/forbidden" element={<Forbidden />} />

            {/* private route "/admin/dashboard" */}
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoutes>
                        <Dashboard />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/permissions" */}
            <Route
                path="/admin/permissions"
                element={
                    <PrivateRoutes>
                        <PermissionsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/roles"
                element={
                    <PrivateRoutes>
                        <RolesIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles/create" */}
            <Route
                path="/admin/roles/create"
                element={
                    <PrivateRoutes>
                        <CreateRoles />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles/edit" */}
            <Route
                path="/admin/roles/edit/:id"
                element={
                    <PrivateRoutes>
                        <RolesEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/users" */}
            <Route
                path="/admin/users"
                element={
                    <PrivateRoutes>
                        <UsersIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/users/create" */}
            <Route
                path="/admin/users/create"
                element={
                    <PrivateRoutes>
                        <UsersCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/users/edit" */}
            <Route
                path="/admin/users/edit/:id"
                element={
                    <PrivateRoutes>
                        <UsersEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/categories" */}
            <Route
                path="/admin/categories"
                element={
                    <PrivateRoutes>
                        <CategoriesIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/categories/create" */}
            <Route
                path="/admin/categories/create"
                element={
                    <PrivateRoutes>
                        <CategoriesCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/categories/edit" */}
            <Route
                path="/admin/categories/edit/:id"
                element={
                    <PrivateRoutes>
                        <CategoriesEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/posts" */}
            <Route
                path="/admin/posts"
                element={
                    <PrivateRoutes>
                        <PostsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/posts/create" */}
            <Route
                path="/admin/posts/create"
                element={
                    <PrivateRoutes>
                        <PostsCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/posts/edit" */}
            <Route
                path="/admin/posts/edit/:id"
                element={
                    <PrivateRoutes>
                        <PostsEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/pages" */}
            <Route
                path="/admin/pages"
                element={
                    <PrivateRoutes>
                        <PagesIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/pages/create" */}
            <Route
                path="/admin/pages/create"
                element={
                    <PrivateRoutes>
                        <PagesCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/pages/edit" */}
            <Route
                path="/admin/pages/edit/:id"
                element={
                    <PrivateRoutes>
                        <PagesEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/photos" */}
            <Route
                path="/admin/photos"
                element={
                    <PrivateRoutes>
                        <PhotosIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/sliders" */}
            <Route
                path="/admin/sliders"
                element={
                    <PrivateRoutes>
                        <SlidersIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/contacts" */}
            <Route
                path="/admin/contacts"
                element={
                    <PrivateRoutes>
                        <ContacsIndex />
                    </PrivateRoutes>
                }
            />

            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/contacts" */}
            <Route path="/contacts" element={<WebContactsCreate />} />

            {/* route "/pages" */}
            <Route path="/pages" element={<WebPagesIndex />} />

            {/* route "/pages/:slug" */}
            <Route path="/pages/:slug" element={<WebPagesShow />} />

            {/* route "/photos" */}
            <Route path="/photos" element={<WebPhotosIndex />} />

            {/* route "/posts" */}
            <Route path="/posts" element={<WebPostsIndex />} />

            {/* route "/posts:/slug" */}
            <Route path="/posts/:slug" element={<WebPostsShow />} />
        </Routes>
    );
};

export default RoutesIndex;
