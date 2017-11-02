import React, {Component} from "react";
import PropTypes from "prop-types";
import "../../client/main.css";

class CreateDocument extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div id="margentop">
                <button id="btnCreateDocument" onClick={this.onClick}> Crear Documento</button>
            </div>
        );
    }
}

CreateDocument.propTypes = {
    onClick : PropTypes.func.isRequired
};

export default CreateDocument;