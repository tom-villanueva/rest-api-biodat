import React, { Component } from 'react';
import { RouteComponentProps } from "react-router-dom";
import {ItemList} from '../items/ItemList';
import ItemService from "../../services/ItemService";
import ItemInterface from "../../interfaces/ItemInterface";
import FileList from '../files/FileList';
import FileService from '../../services/FileService';
import DataInterface from '../../interfaces/DataInterface';
import FileInterface from '../../interfaces/FileInterface';

export default class Dashboard extends Component<RouteComponentProps> {
    state = {
        project_id: this.props.match.params.id,
        items: [] as ItemInterface[],//ItemInterface[],
        files: [] as FileInterface[],
        selectedItem: -1,
    }

    // async componentDidMount() {
    //     const response = await ItemService.getProjectItems(this.state.project_id);
    //     const items = response.data;
    //     this.setState({
    //       items: items,
    //     });
    // }

    // async componentDidUpdate(prevState) {
    //   if(this.state.selectedItem !== prevState.selectedItem){
    //     const { project_id, selectedItem } = this.state;
    //     const response = await FileService.getItemFiles(project_id, selectedItem);
    //     // const files = response.data;
    //     const files = 
    //     this.setState({
    //       files: files,
    //     })
    //   }
    }

    // async handleAddItem(data){
    //     const item = await ItemService.createItem(this.state.project_id, data);
    //     let newItems: ItemInterface[];
    //     newItems = this.state.items;
    //     newItems.push(item.data);
    //     this.setState({
    //       //items: [...this.state.items, item],
    //       items: newItems,
    //     });
    // }

    // async handleItemEdit(data, targetItem: number) {
    //     const newItem = await ItemService.updateItem(this.state.project_id, data.id, data);
    
    //     let newItems: ItemInterface[];
    //     newItems = this.state.items;
    
    //     let index: number;
    //     for (let item of newItems){
    //       index = newItems.indexOf(item);
    //       if (item.id === targetItem){
    //         newItems[index] = newItem.data;
    //       }
    //     }
    //     this.setState({
    //       items: newItems,
    //     });
    // }

    // async handleItemDelete(data, targetItem: number) {
        // const response = await ItemService.deleteItem(this.state.project_id, data.id);
    
        // let newItems: ItemInterface[];
        // newItems = this.state.items.filter((item : ItemInterface) => {
        //   return item.id !== targetItem;
        // });
    //     this.setState({
    //       items: newItems,
    //     });
    // }

//     async handleSelectedItem(id: number, items: ItemInterface[]) {
//       this.setState({
//         items: items,
//         selectedItem: id,
//       })
//     }

//     render() {
//         return (
//             <div>
//                 <div className="row">
//                     <div className="col-6">
//                     <ItemList 
//                       items = { this.state.items }
//                       project_id = { this.state.project_id }
//                       handleSelectedItem = { (id, items) => this.handleSelectedItem(id, items) }
//                     />
//                     </div>
//                     <div className="col-6">
//                     <FileList 
//                       files = { this.state.files }
//                     />
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
