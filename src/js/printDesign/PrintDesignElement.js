import React, {
    Component,
    PropTypes,
} from 'react';

import PrintDesignElementPosition from './PrintDesignElementPosition';
import PrintDesignElementShadow from './PrintDesignElementShadow';
import PrintDesignElementInfo from './PrintDesignElementInfo';
import ElementTypeMapper from './elements/ElementTypeMapper';

class PrintDesignElement extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            element: props.element,
            parentDimension: props.parentDimension,
            global: props.global
        }
        this.state.size = this.getSize(props.element.pos, props.parentDimension);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.parentDimension !== this.state.parentDimension) {
            this.setState({
                parentDimension:nextProps.parentDimension,
                size: this.getSize(nextProps.element.pos, nextProps.parentDimension)
            });
        }
        if (nextProps.element !== this.state.element) {
            this.setState({
                element: nextProps.element,
                size: this.getSize(nextProps.element.pos, nextProps.parentDimension)
            });
        }
        if (nextProps.global !== this.state.global) {
            this.setState({
                global:nextProps.global,
            });
        }
    }

    showElement() {
        return ElementTypeMapper[this.state.element.type] ? React.createElement(ElementTypeMapper[this.state.element.type].view, { element: this.state.element, size: this.getSize(this.state.element.pos, this.state.parentDimension) }) : <div>No Element found for this type</div>;
    }

    setElementSelect() {
        this.props.onSelect(this.state.element);
    }

    getSize(pos, parentDimension) {
        console.log('getSize', pos, parentDimension);
        var position = pos || this.state.element.pos;
        var pd = parentDimension || this.state.parentDimension;
        if (!position || !pd) return { width: -1, height: -1};
        var size = { width: pd.width * position.w, height: pd.height * position.h };
        return size;
    }

    positionChange(pos, size) {
        this.setState({size});
        this.props.onElementChange({...this.state.element, pos: pos });
    }

    render() {
        // TODO:: better way to ensure element content above shadow?
        const elementStyle = {
            position: 'relative',
            zIndex: 100,
            height: '100%'
        };

        return (
            <div>
                <PrintDesignElementPosition onChange={this.positionChange.bind(this)} position={this.state.element.pos} parentDimension={this.state.parentDimension}>
                    <PrintDesignElementShadow isShow={this.props.global.showShadow} />
                    <div style={elementStyle} onClick={this.setElementSelect.bind(this)}>
                        {this.showElement()}
                    </div>
                    <PrintDesignElementInfo element={this.state.element} size={this.state.size} isShow={this.props.global.showInfo} />
                </PrintDesignElementPosition>
            </div>
        );
    }
}

PrintDesignElement.propTypes = {};
PrintDesignElement.defaultProps = {};

export default PrintDesignElement;
