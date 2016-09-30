import React, {
    Component,
    PropTypes,
} from 'react';
import Measure from 'react-measure';

import PrintDesignElement from './PrintDesignElement';

class PrintDesignDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pdContainerStyles: {
                backgroundColor: '#f3f3f3',
                color: '#737373',
                position: 'relative'
            },
            blueprint: props.blueprint
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.blueprint !== this.state.blueprint) {
            this.setState({
                blueprint: nextProps.blueprint,
            }, function() {
                this.updateDimensions();
            });
        }
    }

    updateDimensions(dimensions) {
        if (dimensions) {
            this.setState({dimensions}, function() {
                this.updateContainerStyles({ height: (this.state.dimensions.width * this.state.blueprint.containerRatio) + 'px' });
            });
        } else {
            this.updateContainerStyles({height: (this.state.dimensions.width * this.state.blueprint.containerRatio) + 'px'});
        }
    }

    updateContainerStyles(styles) {
        this.setState({
            pdContainerStyles: Object.assign({}, this.state.pdContainerStyles, styles)
        });
    }

    setSelectedElement(ele) {
        var newBp = {...this.state.blueprint};
        newBp.elements = newBp.elements.map(function(origEle) {
            // TODO:: check if ctrl key is pressed, and allow multiselect if true
            origEle.selected = origEle.id === ele.id;
            return origEle;
        });

        this.props.onChange(newBp);
    }

    elementChange(ele) {
        var newBp = {...this.state.blueprint};
        newBp.elements = newBp.elements.map(function(origEle) {
            return origEle.id === ele.id ? ele : origEle;
        });

        this.props.onChange(newBp);
    }

    render() {
        const ElementComponents = this.state.blueprint.elements.map((ele, i) => {
            return <PrintDesignElement key={i} element={ele} global={this.state.blueprint.settings} onElementChange={this.elementChange.bind(this)} parentDimension={this.state.dimensions} onSelect={this.setSelectedElement.bind(this)}></PrintDesignElement>
        });


        return (
            <div>
                <Measure onMeasure={(dimensions) => { this.updateDimensions(dimensions) }}>
                    <div style={this.state.pdContainerStyles}>
                        {ElementComponents}
                    </div>
                </Measure>
            </div>
        );
    }
}

PrintDesignDisplay.propTypes = {};
PrintDesignDisplay.defaultProps = {};

export default PrintDesignDisplay;
