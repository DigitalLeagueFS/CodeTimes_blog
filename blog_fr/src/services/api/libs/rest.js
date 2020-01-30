import {XhrClient} from '../configuration/client';

export default ({ path, model }) => ({
    fetchAll: (params) => {
        let client=new XhrClient();
        client.setHeader("content-type","form-data")
       return client.get(path, {params: {...params}})
    },
    show: ({ id }) =>{
        let client=new XhrClient();
     return    client.get(`${path}/${id}`)
    },
    create: ({ ...fields }) => {
        let client=new XhrClient();
        return     client.post(path, {[model]: {...fields}})
    },
    update: ({ id, ...fields }) => {
        let client=new XhrClient();
        return   client.put(`${path}/${id}`, {[model]: {...fields}})
    },
    destroy: ({ id }) => {
        let client=new XhrClient();
        return    client.delete(`${path}/${id}}`)
    },
});
