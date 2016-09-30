import React, {
    Component,
    PropTypes,
} from 'react';

class TextControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            element: props.element
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.element !== this.state.element) {
            this.setState({
                element:nextProps.element,
            });
        }
    }


    update(e) {
        var newEle = {...this.state.element, value: e.target.value};
        console.log('textControl update', newEle.value);
        this.props.onChange(newEle);
    }

    render() {
        return (
            <div>
                <div class="form-group">
                    <textarea class="form-control" value={this.state.element.value} onChange={this.update.bind(this)} />
                </div>
            </div>
        );
    }
}

TextControl.propTypes = {};
TextControl.defaultProps = {};

export default TextControl;
