import axios from '@/bootstrap';

const BASE_URL = "/api/v1/";

export function login(payload){
    return axios.post(BASE_URL + 'login', payload)
        .then((response) => response)
}

export function reset_password(payload){
    return axios.post(BASE_URL + 'reset-password', payload)
        .then((response) => response)
}

export function set_password(payload){
    return axios.post(BASE_URL + 'set-password', payload)
        .then((response) => response)
}


export function logout(){
    return axios.post(BASE_URL + 'logout')
        .then((response) => response)
}

export function me(){
    return axios.get(BASE_URL + 'profile/me', {
        type: 'global'
    })
        .then((response) => response)
}

export function me_save_settings(payload){
    return axios.post(BASE_URL + 'profile/me/settings', payload, {
        type: 'global'
    })
        .then((response) => response)
}


export function masters(payload){
    return axios.get(BASE_URL + "profile/masters", {
        params: payload
    }).then((response) => response)
}

export function master(id, payload){
    return axios.get(BASE_URL + "profile/masters/"+id, {
        params: payload
    }).then((response) => response)
}

export function create_master(payload){
    return axios.post(BASE_URL + "profile/masters", payload)
        .then((response) => response)
}

export function update_masters(id, payload){
    payload.append('_method', 'patch');

    return axios.post(BASE_URL + "profile/masters/" + id, payload)
        .then((response) => response)
}

export function delete_master(id){
    var payload = {
        _method: 'delete'
    }

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

export function delete_salon(id){
    var payload = {
        _method: 'delete'
    }

    return axios.post(BASE_URL + "profile/salons/" + id , payload)
        .then((response) => response)
}

export function delete_salon_confirm(id){
    var payload = {
        _method: 'delete',
        confirm: true
    }

    return axios.post(BASE_URL + "profile/salons/" + id , payload)
        .then((response) => response)
}

export function services(payload){
    return axios.get(BASE_URL + "profile/services", {
        params: payload
    }).then((response) => response)
}

export function service(id, payload){
    return axios.get(BASE_URL + "profile/services/"+id, {
        params: payload
    }).then((response) => response)
}

export function create_service(payload){
    return axios.post(BASE_URL + "profile/services", payload)
        .then((response) => response)
}

export function update_service(id, payload){
    if (payload instanceof FormData)
        payload.append('_method', 'patch');
    else
        payload._method = 'patch'

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

export function order(id){
    return axios.get(BASE_URL + "profile/orders/"+id)
        .then((response) => response)
}

export function create_orders(organization_id, payload){
    return axios.post(BASE_URL + "clients/" + organization_id + '/orders' , payload)
        .then((response) => response)
}

export function update_order(order_id,payload){
    payload._method = 'patch'
    return axios.post(BASE_URL + "profile/orders/" + order_id , payload)
        .then((response) => response)
}

export function delete_order(order_id){

    return axios.post(BASE_URL + "profile/orders/" + order_id , {
        _method: "DELETE"
    })
        .then((response) => response)
}


export function workingDiapasons(payload){
    return axios.get(BASE_URL + "clients/" + payload.organization_id + '/masters/' + payload.master_id + '/working-diapasons' , {
        params: payload
    })
        .then((response) => response)
}


export function save_settings(payload){
    return axios.post(BASE_URL + "profile/settings", payload)
        .then((response) => response)
}

export function save_settings_part(payload){
    return axios.post(BASE_URL + "profile/settings/part", payload)
        .then((response) => response)
}



export function organizations(payload){
    return axios.get(BASE_URL + 'profile/organizations' , {
        params: payload
    })
        .then((response) => response)
}


export function create_organization(payload){
    return axios.post(BASE_URL + 'profile/organizations' , payload)
        .then((response) => response)
}




export function create_demo(payload){
    return axios.post(BASE_URL + "create-demo", payload)
        .then((response) => response)
}

export function admin_users(payload){
    return axios.get(BASE_URL + 'profile/users' , {
        params: payload
    })
        .then((response) => response)
}

export function admin_user_save(user_id, payload){
    return axios.post(BASE_URL + 'profile/users/' + user_id , payload)
        .then((response) => response)
}

export function clients(payload) {
    return axios.get(BASE_URL + 'profile/clients', {
        params: payload
    })
        .then((response) => response)
}

export function client_update(id, payload) {
    return axios.post(BASE_URL + 'profile/clients/'+id, payload)
        .then((response) => response)
}

export function breeds(payload) {
    return axios.get(BASE_URL + 'profile/breeds', {
        params: payload
    })
        .then((response) => response)
}


export function breed_create(payload) {
    return axios.post(BASE_URL + 'profile/breeds', payload)
        .then((response) => response)
}

export function breed_update(id, payload) {
    payload._method = 'patch'
    return axios.post(BASE_URL + 'profile/breeds/' + id, payload)
        .then((response) => response)
}

export function organizationUpdate(id, payload) {
    payload._method = 'patch'
    return axios.post(BASE_URL + 'profile/organizations/' + id, payload)
        .then((response) => response)
}

export function tags(payload) {
    return axios.get(BASE_URL + 'profile/tags', {
        params: payload
    })
        .then((response) => response)
}

export function tag_create(payload){
    return axios.post(BASE_URL + 'profile/tags', payload)
        .then((response) => response)
}

export function tag_update(id, payload){
    payload._method = 'patch'
    return axios.post(BASE_URL + 'profile/tags/'+id, payload)
        .then((response) => response)
}

export function pets(payload){
    return axios.get(BASE_URL + 'profile/pets', {
        params: payload
    })
        .then((response) => response)
}

export function pet_update(id, payload){
    if (payload instanceof FormData)
        payload.append('_method', 'patch');
    else
        payload._method = 'patch'
    return axios.post(BASE_URL + 'profile/pets/'+id, payload)
        .then((response) => response)
}

export function chat_messages(chat_id, payload){
    return axios.get(BASE_URL + 'profile/chat/'+chat_id+'/messages', {
        params: payload
    }).then((response) => response)
}

export function send_message(chat_id, payload){
    return axios.post(BASE_URL + 'profile/chat/'+chat_id+'/messages', payload)
        .then((response) => response)
}

export function update_message(chat_id, message_id, payload){
    return axios.post(BASE_URL + `profile/chat/${chat_id}/messages/${message_id}`, payload)
        .then((response) => response)
}


export function chat_messages_set_read(chat_id, message_id){
    return axios.get(`${BASE_URL}profile/chat/${chat_id}/messages/${message_id}/set-read`)
        .then((response) => response)
}

export function packages(payload) {
    return axios.get(BASE_URL + 'profile/abonements', {
        params: payload
    }).then((response) => response)
}

export function package_create(payload) {
    return axios.post(BASE_URL + 'profile/abonements', payload)
        .then((response) => response)
}

export function comments(payload) {
    return axios.get(BASE_URL + 'profile/comments', {
        params: payload
    })
        .then((response) => response)
}

export function transactions(payload) {
    return axios.get(BASE_URL + 'profile/transactions', {
        params: payload,
        type: 'global'
    })
        .then((response) => response)
}

export function shop_categories(payload){
    return axios.get(BASE_URL + 'profile/shop-categories', {
        params: payload
    }).then((response) => response)
}

export function shop_category_create(payload) {
    let url = BASE_URL + 'profile/shop-categories';
    if (payload.id){
        payload._method = 'patch'
        url += `/${payload.id}`
    }
    return axios.post(url, payload, {
        type: 'global'
    })
        .then((response) => response)
}

export function shop_items(payload){
    return axios.get(BASE_URL + 'profile/shop-items', {
        params: payload
    }).then((response) => response)
}

export function shop_item_create(payload){
    let url = BASE_URL + 'profile/shop-items';
    let id = payload.get('id');

    if (id != null && id != 'null'){
        payload.append('_method', 'patch');
        url += `/${payload.get('id')}`
    }
    return axios.post(url, payload, {
        type: 'global'
    }).then((response) => response)
}

export function sms_services() {
    return axios.get(`${BASE_URL}profile/sms-services`)
}

export function google_oauth(payload) {
    return axios.get(BASE_URL + 'profile/google/oauth', payload)
        .then((response) => response)
}

export function google_oauth2callback(payload) {
    return axios.post(BASE_URL + 'profile/google/oauth2callback', payload)
        .then((response) => response)
}
