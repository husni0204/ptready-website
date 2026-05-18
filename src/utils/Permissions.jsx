import Cookies from 'js-cookie';

const hasAnyPermission = (permissions) => {
    //get permissions from cookies
    const permissionsCookie = Cookies.get('permissions');
    if (!permissionsCookie) return false;

    let allPermissions = JSON.parse(permissionsCookie);

    let hasPermission = false;

    permissions.forEach(function (item) {
        if (allPermissions[item]) hasPermission = true;
    });

    return hasPermission;
};

export default hasAnyPermission;
