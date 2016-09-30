import React, {
    Component,
    PropTypes,
} from 'react';

class PrintDesignElementInfo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            size: props.size,
            element: props.element
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.element !== this.state.element) {
            this.setState({
                element:nextProps.element,
                size: nextProps.size
            });
        }
        if (nextProps.size !== this.state.size) {
            this.setState({
                size:nextProps.size,
            });

        }
    }

    getStyle() {
        return this.props.isShow ? this.props.shadowStyle : { display: 'none' };
    }

    render() {
        const rightContainerStyles = {
            float: 'right'
        };
        return (
            <div style={this.getStyle()}>
                <div style={rightContainerStyles}>x: {(this.state.element.pos.l * 100).toFixed(1)}% y: {(this.state.element.pos.t * 100).toFixed(1)}%</div>
                Width: {this.state.size.width.toFixed(1)}px Height: {this.state.size.height.toFixed(1)}px
            </div>
        );
    }
}

PrintDesignElementInfo.propTypes = {};
PrintDesignElementInfo.defaultProps = {
    shadowStyle: {
        position: 'absolute',
        bottom: '-30px',
        left: 0,
        width: '100%',
        height: '30px',
        backgroundColor: 'rgba(6, 6, 6, 0.46)',
        color: '#e6e6e6',
        padding: '4px'
    }
};

export default PrintDesignElementInfo;
