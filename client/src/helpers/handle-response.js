import authenticationService from '../services/authentication.service';

export default function handleResponse(response) {
    return response.text().then(text => {
        console.log(text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            console.log("response not okay");
            let errorStatus = false;

            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
                errorStatus = true;
            }

            const error = data;
            return Promise.reject(error);
        }

        return data;
    });
}