import React, {
    Component,
    PropTypes,
} from 'react';

import PrintDesignEditor from './printDesign/PrintDesignEditor';

class ExampleApp extends Component {
    constructor() {
        super();
        this.state = {
            pdBlueprint: {
                containerRatio: 0.5,
                settings: {
                    editable: true,
                    showShadow: true,
                    showInfo: true
                },
                elements: [
                    {
                        id: 1,
                        type: 'text',
                        value: 'some text',
                        styles: {
                            fontSize: '8pt',
                            textDecoration: 'overline'
                        },
                        pos: {
                            l: 0.0,
                            t: 0.0,
                            w: 0.5,
                            h: 0.5
                        }
                    },
                    {
                        id: 2,
                        type: 'text',
                        value: 'some text',
                        styles: {
                            fontSize: '8pt',
                            textDecoration: 'overline'
                        },
                        pos: {
                            l: 0.5,
                            t: 0.5,
                            w: 0.5,
                            h: 0.49
                        }
                    }
                ]
            }
        }
    }

    onBlueprintChange(blueprint) {
        this.setState({
            pdBlueprint: blueprint,
        });
    }

    render() {
        return (
            <div>
                <PrintDesignEditor blueprint={this.state.pdBlueprint} onChange={this.onBlueprintChange.bind(this)}></PrintDesignEditor>
            </div>
        );
    }
}

ExampleApp.propTypes = {};
ExampleApp.defaultProps = {};

export default ExampleApp;
