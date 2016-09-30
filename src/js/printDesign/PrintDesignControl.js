import React, {
    Component,
    PropTypes,
} from 'react';

import ElementTypeMapper from './elements/ElementTypeMapper';

class PrintDesignControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            blueprint: props.blueprint,
            selectedElement: this.getSelectedElement(props.blueprint.elements)
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.blueprint !== this.state.blueprint) {
            this.setState({
                blueprint: nextProps.blueprint,
                selectedElement: this.getSelectedElement(nextProps.blueprint.elements)
            }, function() {
                this.showElement();
            });
        }
    }

    getSelectedElement(elements) {
        var selectedElements = elements.filter(function(ele) {
            return ele.selected;
        });
        return selectedElements[0];
    }

    onElementChange(element) {
        var newBlueprint = Object.assign({}, this.state.blueprint);

        var eleIndex = this.state.blueprint.elements.findIndex(function(v, i) {
            return v.id === element.id;
        });
        newBlueprint.elements[eleIndex].value = element.value;

        this.props.onChange(newBlueprint);
    }

    showElement() {
        if (!this.state.selectedElement) return;
        return ElementTypeMapper[this.state.selectedElement.type] ? React.createElement(ElementTypeMapper[this.state.selectedElement.type].control, { element: this.state.selectedElement, onChange: this.onElementChange.bind(this) }) : <div></div>;
    }

    toggleShowShadow() {
        var newBlueprint = Object.assign({}, this.state.blueprint);
        newBlueprint.settings.showShadow = !newBlueprint.settings.showShadow;

        this.props.onChange(newBlueprint);
    }

    toggleInfo() {
        var newBlueprint = {...this.state.blueprint};
        newBlueprint.settings.showInfo = !newBlueprint.settings.showInfo;

        this.props.onChange(newBlueprint);
    }

    removeElement(ele) {

    }

    render() {
        const { settings } = this.state.blueprint;
        const containerStyles = {
            padding: '10px 10px'
        };
        const buttonStyles = {
            marginRight: '10px'
        }
        const elementControlStyles = {
            padding: '10px 0'
        }
        return (
            <div style={containerStyles}>
                <div class="control-general">
                    <button style={buttonStyles} class={ "btn btn-default " + (settings.showShadow ? 'active' : '') } onClick={this.toggleShowShadow.bind(this)}>Shadow</button>
                    <button class={ "btn btn-default " + (settings.showInfo ? 'active' : '') } onClick={this.toggleInfo.bind(this)}>Info</button>
                </div>
                <div class="control-general-element">
                    <button class="btn btn-default" onClick={this.removeElement.bind(this)} disabled={this.state.selectedElement}>Remove</button>
                </div>
                <div style={elementControlStyles}>
                    {this.showElement()}
                </div>
            </div>
        );
    }
}

PrintDesignControl.propTypes = {};
PrintDesignControl.defaultProps = {};

export default PrintDesignControl;
