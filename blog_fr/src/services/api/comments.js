import createRestApi from './libs/rest';

export default {
    ...createRestApi({path: '/comments', model: 'comment'}),
};