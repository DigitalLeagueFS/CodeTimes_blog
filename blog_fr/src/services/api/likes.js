import createRestApi from './libs/rest';

export default {
    ...createRestApi({path: '/likes', model: 'like'}),
};