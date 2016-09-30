import React, {
    PropTypes,
} from 'react';

import TextElement from './TextElement';
import TextControl from './TextControl';

const ElementTypeMapper = React.createClass({
    statics: {
        text: {
            view: TextElement,
            control: TextControl
        }
    },
    render() { }
});

export default ElementTypeMapper;
