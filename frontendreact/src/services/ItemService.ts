import ItemInterface from "../interfaces/ItemInterface";
import http from "./HttpService";

const getAll = (projectID: number) => {
    return http.get(`/projects/${projectID}/items`);
};

const get = (projectID: number, itemID: number) => {
    return http.get(`/projects/${projectID}/items/${itemID}`);
};

const create = (item: ItemInterface) => {
    return http.post(`/projects/${item.project_id}/items`, item);
};

const update = (item: ItemInterface) => {
    return http.put(`/projects/${item.project_id}/items/${item.id}`);
};

const remove = (item: ItemInterface) => {
    return http.delete(`/projects/${item.project_id}/items/${item.id}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};


// const getProjectItems = async (item: ItemInterface) => {
    //     // const url = `${API_URL}/api/projects/${project_id}/items`;
    //     // // const history = useHistory();
    //     // //return axios.get(url).then(response => response.data);
    //     // try {
    //     //     const response = await HttpService.get(url);
    //     //     console.log("respuesta en get ", response);
    //     //     return response;
    //     // } catch (error) {
    //     //     // history.replace(history.location.pathname, { 
    //     //     //     errorStatusCode: error 
    //     //     // });
    //     //     console.error("error", error);
    //     //     console.error("Not able to fetch the project items");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/${item.project_id}/items`,
    //         method : "GET" as const,
    //         data : {},
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }

    // const getItem = async (item: ItemInterface) => {
    //     // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
    //     // //return axios.get(url).then(response => response.data);
    //     // try {
    //     //     const response = await HttpService.get(url);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to fetch the item");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/${item.project_id}/items/${item.id}`,
    //         method : "GET" as const,
    //         data : {},
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }

    // const deleteItem = async (item: ItemInterface) => {
    //     // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
    //     // //return axios.delete(url);
    //     // try {
    //     //     const response = await HttpService.delete(url);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to delete the item");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/${item.project_id}/items/${item.id}`,
    //         method : "DELETE" as const,
    //         data : {},
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }

    // const createItem = async (item: ItemInterface) => {
    //     // const url = `${API_URL}/api/projects/${project_id}/items`;
    //     // //return axios.post(url,project);
    //     // try {
    //     //     const response = await HttpService.post(url, itemData);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to create the item");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/${item.project_id}/items/}`,
    //         method : "POST" as const,
    //         data : item,
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }

    // const updateItem = async (item: ItemInterface) => {
    //     // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
    //     // //return axios.put(url,project);
    //     // try {
    //     //     const response = await HttpService.put(url, itemData);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to fetch the item");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/${item.project_id}/items/${item.id}`,
    //         method : "PUT" as const,
    //         data : item,
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }