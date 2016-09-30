import React, {
    Component,
    PropTypes,
} from 'react';

class PrintDesignElementShadow extends Component {

    getShadow() {
        return this.props.isShow ? this.props.shadowStyle : {};
    }

    render() {
        return (
            <div style={this.getShadow()}>

            </div>
        );
    }
}

PrintDesignElementShadow.propTypes = {};
PrintDesignElementShadow.defaultProps = {
    shadowStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(183, 183, 183, 0.41)'
    }
};

export default PrintDesignElementShadow;
