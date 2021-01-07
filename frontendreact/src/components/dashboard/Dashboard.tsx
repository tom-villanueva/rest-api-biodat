import React, { Component } from 'react'
import { RouteComponentProps } from "react-router-dom";
import ItemList from '../items/ItemList'

export default class Dashboard extends Component<RouteComponentProps> {
    render() {
        return (
            <div>
                <ItemList project_id={ this.props.match.params.id }/>
            </div>
        )
    }
}
