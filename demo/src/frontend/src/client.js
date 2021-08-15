import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        console.log(response);
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllProperties = () =>
    fetch("api/v1/properties")
        .then(checkStatus);

export const addNewProperty = property =>
    fetch("api/v1/properties", {
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(property)
    }).then(checkStatus)

export const deleteProperty = propertyId =>
    fetch(`api/v1/properties/${propertyId}`, {
        method:'DELETE'
    }).then(checkStatus)