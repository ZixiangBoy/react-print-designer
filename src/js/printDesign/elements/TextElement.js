import React, {
    Component,
    PropTypes,
} from 'react';
import { Textfit } from 'react-textfit';

class TextElement extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            element: props.element,
            containerStyle: {
                padding: '10px',
                height: 500,
                width: 500
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.element !== this.state.element) {
            console.log('updating element', nextProps.element.value);
            this.setState({
                element:nextProps.element,
            });
        }
        if (nextProps.size !== this.props.size) {
            console.log('<TextElement> receive props');
            this.setState({
                containerStyle: {...this.state.containerStyle, width: this.props.size.width, height: this.props.size.height},
            });
        }
    }

    render() {
        return (
            <Textfit mode="multi" perfectFit={true}>{this.state.element.value}</Textfit>
        );
    }
}

TextElement.propTypes = {};
TextElement.defaultProps = {};

export default TextElement;
