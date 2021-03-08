import React, { Component } from 'react'
import { RouteComponentProps } from "react-router-dom";
import ItemList from '../items/ItemList'
import ItemService from "../../services/ItemService";

export default class Dashboard extends Component<RouteComponentProps> {

    state = {
        Items: []
    }

    async componentDidMount() {
        const response = await ItemService.getProjectItems(this.props.match.params.id.project_id);
        const items = response.data;
    }

    render() {
        return (
            <div>
                <ItemList project_id={ this.props.match.params.id }/>
            </div>
        )
    }
}
