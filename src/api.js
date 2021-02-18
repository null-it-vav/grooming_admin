import axios from '@/bootstrap';

const BASE_URL = "/api/v1/";

export function login(payload){
    return axios.post(BASE_URL + 'login', payload)
        .then((response) => response)
}

export function logout(){
    return axios.post(BASE_URL + 'logout')
        .then((response) => response)
}

export function me(){
    return axios.get(BASE_URL + 'profile/me')
        .then((response) => response)
}

export function masters(payload){
    return axios.get(BASE_URL + "profile/masters", {
        params: payload
    }).then((response) => response)
}

export function create_masters(payload){
    return axios.post(BASE_URL + "profile/masters", payload)
        .then((response) => response)
}

export function update_masters(id, payload){
    payload.append('_method', 'patch');

    return axios.post(BASE_URL + "profile/masters/" + id, payload)
        .then((response) => response)
}

export function salons(payload){
    return axios.get(BASE_URL + "profile/salons", {
        params: payload
    }).then((response) => response)
}

export function salon_create(payload){
    return axios.post(BASE_URL + "profile/salons", payload)
        .then((response) => response)
}

export function salon_update(id, payload){
    payload._method = 'patch'

    return axios.post(BASE_URL + "profile/salons/" + id , payload)
        .then((response) => response)
}


export function services(payload){
    return axios.get(BASE_URL + "profile/services", {
        params: payload
    }).then((response) => response)
}

export function create_service(payload){
    return axios.post(BASE_URL + "profile/services", payload)
        .then((response) => response)
}

export function update_service(id, payload){
    payload.append('_method', 'patch');

    return axios.post(BASE_URL + "profile/services/" + id , payload)
        .then((response) => response)
}

export function delete_service(id){
    return axios.post(BASE_URL + "profile/services/" + id , {
        _method: "DELETE"
    })
        .then((response) => response)
}



export function promotions(payload){
    return axios.get(BASE_URL + "profile/promotions" , {
        params: payload
    })
        .then((response) => response)
}

export function delete_promotion(id){
    return axios.post(BASE_URL + "profile/promotions/" + id , {
        _method: "DELETE"
    })
        .then((response) => response)
}


export function create_promotion(payload){
    return axios.post(BASE_URL + "profile/promotions" , payload)
        .then((response) => response)
}


export function update_promotion(id, payload){
    payload.append('_method', 'patch');

    return axios.post(BASE_URL + "profile/promotions/" + id , payload)
        .then((response) => response)
}

export function orders(payload){
    return axios.get(BASE_URL + "profile/orders" , {
        params: payload
    })
        .then((response) => response)
}

export function create_orders(organization_id, payload){
    return axios.post(BASE_URL + "clients/" + organization_id + '/orders' , payload)
        .then((response) => response)
}

export function workingDiapasons(payload){
    return axios.get(BASE_URL + "clients/" + payload.organization_id + '/masters/' + payload.master_id + '/working-diapasons' , {
        params: payload
    })
        .then((response) => response)
}
