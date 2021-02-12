import React, { Component } from 'react'
import FileInterface from '../../interfaces/FileInterface'

interface Props {
  file: FileInterface,
}

export default class FileItem extends Component<Props> {

  state = {
    selected: true,
  }

  render() {
    const { file } = this.props;
    return (
      <tr>
            <td>
                <a className= {`btn btn-sm ${this.state.selected ? "btn-success" : "btn-danger"}`} 
                  /* onClick={(id) => this.onSelect(item.id) 
                }*/
                >
                <i className="fas fa-check"></i>
                </a>
            </td>
            <td>
                <a>
                { file.file_name }
                </a>
                <br />
            </td>
        </tr>
    )
  }
}
