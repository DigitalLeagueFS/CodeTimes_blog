import axios from 'axios';
import { get, set, unset } from 'lodash';

export class XhrClient{
    constructor() {
        this.client=axios.create(
            {
                baseURL: 'http://127.0.0.1:3004/api',
                headers:{
                    'Access-Control-Allow-Origin':'*',
                },
            });

        const interceptorsConfiguration=[
            config=>config,
            error => {
            switch (get(error,'response.status',200)) {
                case 401:
                    window.location='/';
                    break;
                case 403:
                    window.location='/';
                    break;
            }
            return Promise.reject(error);
            },
        ];

        this.client.interceptors.request.use(...interceptorsConfiguration);
        this.client.interceptors.response.use(...interceptorsConfiguration);
    }

    setCSRF(token){
        set(this.client,`defaults.headers.common['X-Csrf-Token']`,token);
    }

    setHeader(header,value){
        set(this.client,`defaults.headers.common['${header}']`,value);
    }

    get(path,params){
        return this.client.get(path,params);
    }


    post(path,data){
        return this.client.post(path,data);
    }

    put(path,data){
        return this.client.put(path,data);
    }

    delete(path){
        return this.client.delete(path);
    }


}

export default  new XhrClient();