import React, { Component} from 'react'
import ProjectInterface from './../interfaces/ProjectInterface';

interface Props {
    id: number,
    project: ProjectInterface,
    onEdit: (id) => void, 
}

export default class ProjectItem extends Component<Props>{
    render() {
        const { id, project, onEdit } = this.props;
        return (
            <tr>
                <td>
                    { id+1 }
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
                    <a className="btn btn-info btn-sm" onClick={(id) => onEdit(project.id) }>
                    <i className="fas fa-pencil-alt">
                    </i>                   
                    </a>
                    <a className="btn btn-danger btn-sm" >
                    <i className="fas fa-trash">
                    </i>                   
                    </a>
                </td>
            </tr>
        )
    }
}