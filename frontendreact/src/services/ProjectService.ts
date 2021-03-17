import http from "./HttpService";
import ProjectInterface from "../interfaces/ProjectInterface";

const getAll = () => {
    return http.get(`/projects/`);
};

const get = (project_id: number) => {
    return http.get(`/projects/${project_id}`);
};

const create = (project: ProjectInterface) => {
    return http.post(`/projects/`, project);
};

const update = (project: ProjectInterface) => {
    return http.put(`/projects/${project.id}`, project);
};

const remove = (project: ProjectInterface) => {
    return http.delete(`/projects/${project.id}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};

// const getProjects = async () => {
    //     // const url = `${API_URL}/api/projects/`;
    //     //return axios.get(url).then(response => response.data);
    //     // try {
    //     //     const response = await HttpService.get(url);
    //     //     console.log("respuesta en get ", response);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to fetch the projects");
    //     // }
        // const options = {
        //     url : `${API_URL}/api/projects/`,
        //     method : "GET" as const,
        //     data : {},
        // }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }

    // const getProject = async (projectID: number) => {
    //     // const url = `${API_URL}/api/projects/${pk}`;
    //     // return axios.get(url).then(response => response.data);
    //     // try {
    //     //     const response = await HttpService.get(url);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to fetch the Project");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/${projectID}`,
    //         method : "GET" as const,
    //         data : {},
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }

    // const deleteProject = async (project: ProjectInterface) => {
    //     // const url = `${API_URL}/api/projects/${project.id}`;
    //     // return axios.delete(url);
    //     // try {
    //     //     const response = await HttpService.delete(url);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to delete the Project");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/${project.id}`,
    //         method : "DELETE" as const,
    //         data : {},
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }

    // const createProject = async (project: ProjectInterface) => {
    //     // const url = `${API_URL}/api/projects/`;
    //     // return axios.post(url,project);
    //     // try {
    //     //     const response = await HttpService.post(url, project);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to create the Project");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/`,
    //         method : "POST" as const,
    //         data : project,
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }

    // const updateProject = async (project: ProjectInterface) => {
    //     // const url = `${API_URL}/api/projects/${project.id}`;
    //     // //return axios.put(url,project);
    //     // try {
    //     //     const response = await HttpService.put(url, project);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error("Not able to fetch the Project");
    //     // }
    //     const options = {
    //         url : `${API_URL}/api/projects/${project.id}`,
    //         method : "PUT" as const,
    //         data : project,
    //     }
    //     const response: AxiosResponse<any> = await useHttpService(options);
    //     setResponse(response);
    // }