import React, {Component} from "react";
import PropTypes from "prop-types";
import "../../client/main.css";

class InputPlayer extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.input.value);
    }

    render() {
        return (
            <div id="margentop">
                <input type="text" placeholder="Palabra" ref={(input) => this.input = input}/>
                <button id="colorboton" onClick={this.onClick}> Ingresa Tu Palabra </button>
            </div>
        );
    }
}

InputPlayer.propTypes = {
    onClick : PropTypes.func.isRequired
};

export default InputPlayer;