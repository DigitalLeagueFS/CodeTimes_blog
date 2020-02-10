import createRestApi from './libs/rest';

export default {
    ...createRestApi({path: '/tags', model: 'tag'}),
};