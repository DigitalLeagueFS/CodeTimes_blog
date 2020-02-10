import createRestApi from './libs/rest';

export default {
    ...createRestApi({path: '/tags_posts', model: 'tags_posts'}),
};