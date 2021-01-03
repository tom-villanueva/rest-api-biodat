import HttpService from "./HttpService";

const API_URL = 'http://localhost:3333';

class ProjectService{

    constructor(){}

    async getProjects() {
        const url = `${API_URL}/api/projects/`;
        //return axios.get(url).then(response => response.data);
        try {
            const response = await HttpService.get(url);
            return response;
        } catch (error) {
            console.error("Not able to fetch the projects");
        }
    }

    async getProject(pk) {
        const url = `${API_URL}/api/projects/${pk}`;
        //return axios.get(url).then(response => response.data);
        try {
            const response = await HttpService.get(url);
            return response;
        } catch (error) {
            console.error("Not able to fetch the Project");
        }
    }

    async deleteProject(project){
        const url = `${API_URL}/api/projects/${project.id}`;
        //return axios.delete(url);
        try {
            const response = await HttpService.delete(url);
            return response;
        } catch (error) {
            console.error("Not able to delete the Project");
        }
    }

    async createProject(project){
        const url = `${API_URL}/api/projects/`;
        //return axios.post(url,project);
        try {
            const response = await HttpService.post(url, project);
            return response;
        } catch (error) {
            console.error("Not able to create the Project");
        }
    }

    async updateProject(project){
        const url = `${API_URL}/api/projects/${project.id}`;
        //return axios.put(url,project);
        try {
            const response = await HttpService.put(url, project);
            return response;
        } catch (error) {
            console.error("Not able to fetch the Project");
        }
    }
}

export default new ProjectService();