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
