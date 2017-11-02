import React, {Component} from "react";
import PropTypes from "prop-types";
import "../../client/main.css";

class Documento extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.redraw(this.props);
    }
    componentWillUpdate(newProps) {
        this.redraw(newProps);
    }

    redraw(newProps) {
        let ctx = this.canvas.getContext("2d");

        newProps.usuarios.forEach((u) => {
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.fillText(u.nombre,u.x,u.y);
        })
    }

    render() {
        return (
            <div>
                <canvas id="border" width={this.props.width} height={this.props.height} ref={(c) => this.canvas = c}></canvas>
            </div>
        );
    }
}

Documento.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    usuarios: PropTypes.array.isRequired
};

export default Documento;