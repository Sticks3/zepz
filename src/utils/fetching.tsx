import axios from 'axios';

export const fetchUsers = async (currentPage: number|undefined, pageSize: number|undefined) => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage ? currentPage.toString() : '1');
    queryParams.append("pagesize", pageSize ? pageSize.toString() : '10');

    const { data } = await axios.get("http://api.stackexchange.com/2.2/users?order=desc&sort=reputation&site=stackoverflow&" + queryParams.toString());
    return data;
};