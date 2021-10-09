import { ref, onMounted } from 'vue';
import Api from '../api';

export default () => {
    const list = ref([]);
    const getList = () => {
        Api.list().then(res => {
            console.log(res);
            if (res.code === 200) {
                list.value = res.data;
            }
        });
    };
    onMounted(() => getList());
    return {
        list,
        getList
    };
};
