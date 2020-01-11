import  createRestApi from './libs/rest';

export default {
    ...createRestApi({path: '/users', model: 'user'}),
};