//import axios
import axios from 'axios';

//import js cookie
import Cookies from 'js-cookie';

const Api = axios.create({
    //set endpoint API
    baseURL: 'https://api.ready-id.co.id',

    //set header axios
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// let browser set multipart boundary for file uploads
Api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }
    return config;
});

//handle unauthenticated
Api.interceptors.response.use(
    function (response) {
        //return response
        return response;
    },
    (error) => {
        //check if response unauthenticated
        if (401 === error.response.status) {
            //remove token
            Cookies.remove('token');

            //remove user
            Cookies.remove('user');

            //remove permissions
            Cookies.remove('permissions');

            //redirect "/"
            window.location = '/';
        } else if (403 === error.response.status) {
            //redirect "/forbiden"
            window.location = '/forbiden';
        } else {
            //reject promise error
            return Promise.reject(error);
        }
    },
);

export default Api;
