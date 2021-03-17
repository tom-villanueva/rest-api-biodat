import React, { Component, useState } from 'react'
import FileInterface from '../../interfaces/FileInterface'

interface Props {
  file: FileInterface,
}

const FileItem = (props: Props) => {

  const [selected, setSelected] = useState(false);

  return (
    <tr>
          <td>
              <a className= {`btn btn-sm ${selected ? "btn-success" : "btn-danger"}`} 
                /* onClick={(id) => this.onSelect(item.id) 
              }*/
              >
              <i className="fas fa-check"></i>
              </a>
          </td>
          <td>
              <a>
              { props.file.file_name }
              </a>
              <br />
          </td>
      </tr>
  )
};
export default FileItem;