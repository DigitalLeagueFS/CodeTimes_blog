import XhrClient from '../configuration/client';

export default ({ path, model }) => ({
    fetchAll: (params) =>
        XhrClient.get(path, {params: {...params}}),
    show: ({ id }) =>
        XhrClient.get(`${path}/${id}`),
    create: ({ ...fields }) =>
        XhrClient.post(path, { [model]: { ...fields } }),
    update: ({ id, ...fields }) =>
        XhrClient.put(`${path}/${id}`, { [model]: { ...fields } }),
    destroy: ({ id }) =>
        XhrClient.delete(`${path}/${id}}`),
});
