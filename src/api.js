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


