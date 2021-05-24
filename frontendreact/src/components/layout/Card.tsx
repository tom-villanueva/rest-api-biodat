import React from 'react'

interface Props {
  title: string;
  children: React.ReactNode,
}

const Card = (props: Props) => {
  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">{props.title}</h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus" />
          </button>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="remove"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body">
        {props.children}
      </div>
      {/* /.card-body */}
    </div>
  );
}

export default Card;
