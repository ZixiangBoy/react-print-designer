import React, {
    Component,
    PropTypes,
} from 'react';
import Rnd from 'react-rnd';
import Measure from 'react-measure';

class PrintDesignElementPosition extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            position: props.position,
            parentDimension: props.parentDimension,
            dimensions: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.position !== this.state.position) {
            this.setState({
                position: nextProps.position,
            }, function() {
                this.updateRndDimension(this.state.position);
            });
        }
        if (nextProps.parentDimension !== this.state.parentDimension) {

            this.setState({
                parentDimension: nextProps.parentDimension,
            }, function() {
                this.updateRndDimension(this.state.position);
            });
        }
    }

    updateRndDimension(pos) {
        var size = { width: this.toPixel(pos.w, 'w'), height: this.toPixel(pos.h, 'h') };
        var position = { x: this.toPixel(pos.l, 'w'), y: this.toPixel(pos.t, 'h') };
        this.rnd.updateSize(size);
        this.rnd.updatePosition(position);
    }

    toPixel(sizePercent, direction) {
        var fullLength = this.state.parentDimension ? direction.toLowerCase() === 'w' ? this.state.parentDimension.width : this.state.parentDimension.height : 0;
        return fullLength * sizePercent;
    }

    updateDimensions(dimensions) {
        this.setState({dimensions});
    }

    getBounds() {
        return {
            left: 0,
            top: 0,
            right:  this.state.parentDimension ?  this.state.parentDimension.width - this.state.dimensions.width : 0,
            bottom:  this.state.parentDimension ? this.state.parentDimension.height - this.state.dimensions.height : 0
        }
    }

    dragUpdate(e,ui) {
        this.updatePosition({
            l: ui.position.left / this.state.parentDimension.width,
            t: ui.position.top / this.state.parentDimension.height
        });
    }

    resizeUpdate(dir, size, clientSize, delta, newPos) {
        this.updatePosition({
            w: size.width / this.state.parentDimension.width,
            h: size.height / this.state.parentDimension.height,
            l: newPos.x / this.state.parentDimension.width,
            t: newPos.y / this.state.parentDimension.height
        });
    }

    updatePosition(pos) {
        var finalPos = {
            w: pos.w || this.state.position.w,
            h: pos.h || this.state.position.h,
            l: pos.l || this.state.position.l,
            t: pos.t || this.state.position.t
        }

        var size = { width: this.toPixel(finalPos.w, 'w'), height: this.toPixel(finalPos.h, 'h') };

        this.props.onChange(finalPos, size);
    }

    render() {
        return (
                <Measure onMeasure={(dimensions) => { this.updateDimensions(dimensions) }}>
                    <Rnd
                        ref={c => { this.rnd = c; }}
                        minWidth={100}
                        minHeight={10}
                        bounds={ this.getBounds() }
                        onDrag={ this.dragUpdate.bind(this) }
                        onResize={ this.resizeUpdate.bind(this) }
                    >
                        {this.props.children}
                    </Rnd>
                </Measure>
        );
    }
}

PrintDesignElementPosition.propTypes = {};
PrintDesignElementPosition.defaultProps = {};

export default PrintDesignElementPosition;
