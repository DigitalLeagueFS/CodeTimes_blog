import createRestApi from './libs/rest';

export default {
    ...createRestApi({ path: '/companies', model: 'company' }),

};
