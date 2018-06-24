import React from 'react';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
var sprintf = require("sprintf-js").sprintf;

class TrussElement extends React.Component {
    render() {

        console.log(sprintf("this.props = %s", String(this.props)));
        Object.keys(this.props).forEach(key => {
            console.log(sprintf("this.props.%s=...", String(key)));
        });

        return (
            <div key={this.props.id}>
                <h2>
                    {this.props.truss.trussName}
                </h2>
            </div>
        )
    }
}

export default TrussElement;