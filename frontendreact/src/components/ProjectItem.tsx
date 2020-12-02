import React, { Component} from 'react'
import ProjectInterface from './../interfaces/ProjectInterface';

interface Props {
    project: ProjectInterface  
}

export default class ProjectItem extends Component<Props>{
    render() {
        const { project } = this.props;
        return (
            <tr>
                <td>
                    { project.id }
                </td>
                <td>
                    <a>
                    { project.title }
                    </a>
                    <br />
                </td>
                <td>
                    <a>
                    { project.description }
                    </a>
                    <br />
                </td>
                <td>
                    <a>
                    { project.created_at.slice(0, 10) }
                    </a>
                    <br />
                </td>
                <td className="project-actions text-right">
                    <a className="btn btn-primary btn-sm" href="#">
                    <i className="fas fa-tachometer-alt">
                    </i>
                    Dashboard
                    </a>
                    <a className="btn btn-info btn-sm" href="#">
                    <i className="fas fa-pencil-alt">
                    </i>
                    Editar
                    </a>
                    <a className="btn btn-danger btn-sm" href="#">
                    <i className="fas fa-trash">
                    </i>
                    Borrar
                    </a>
                </td>
            </tr>
        )
    }
}