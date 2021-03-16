import React, { Component } from "react";
import ProjectInterface from "../../interfaces/ProjectInterface";

interface Props {
  id: number;
  project: ProjectInterface;
  onEdit: (id) => void;
  onDelete: (id) => void;
}

export const ProjectItem = (props: Props) => {
  return (
    <tr>
      <td>{props.id + 1}</td>
      <td>
        <a>{props.project.title}</a>
        <br />
      </td>
      <td>
        <a>{props.project.description}</a>
        <br />
      </td>
      <td>
        <a>{props.project.created_at.slice(0, 10)}</a>
        <br />
      </td>
      <td className="project-actions text-center">
        <a className="btn btn-primary btn-sm" href={"/dashboard/" + props.project.id}>
          <i className="fas fa-tachometer-alt"></i>
          Dashboard
        </a>
        <a className="btn btn-info btn-sm" onClick={(id) => props.onEdit(props.project.id)}>
          <i className="fas fa-pencil-alt"></i>
        </a>
        <a
          className="btn btn-danger btn-sm"
          onClick={(id) => props.onDelete(props.project.id)}
        >
          <i className="fas fa-trash"></i>
        </a>
      </td>
    </tr>
  );
};
