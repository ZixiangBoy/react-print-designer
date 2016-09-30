import React, {
    Component,
    PropTypes,
} from 'react';

import PrintDesignControl from './PrintDesignControl';
import PrintDesignDisplay from './PrintDesignDisplay';

class PrintDesignEditor extends Component {
    constructor(props, context) {
        super();
        this.state = {
            blueprint: props.blueprint
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.blueprint !== this.state.blueprint) {
            this.setState({blueprint: nextProps.blueprint});
        }
    }

    blueprintChange(blueprint) {
        console.log('blueprintChange', blueprint);
        this.setState({blueprint});
        this.props.onChange(blueprint);
    }

    render() {
        return (
            <div>
                <PrintDesignDisplay blueprint={this.state.blueprint} onChange={this.blueprintChange.bind(this)}></PrintDesignDisplay>
                <PrintDesignControl blueprint={this.state.blueprint} onChange={this.blueprintChange.bind(this)}></PrintDesignControl>
            </div>
        );
    }
}

PrintDesignEditor.propTypes = {};
PrintDesignEditor.defaultProps = {};

export default PrintDesignEditor;
