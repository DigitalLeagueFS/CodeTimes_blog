import createRestApi from './libs/rest';

export default {
    ...createRestApi({ path: '/categories', model: 'category' }),

};
