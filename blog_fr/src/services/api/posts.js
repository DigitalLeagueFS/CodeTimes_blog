import createRestApi from './libs/rest';

export default {
    ...createRestApi({path: '/posts', model: 'post'}),
};