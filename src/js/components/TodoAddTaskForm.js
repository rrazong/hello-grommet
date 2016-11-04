import React from 'react';
import Layer from 'grommet/components/Layer';

export default class TodoAddTaskForm extends React.Component {
  render() {
    const { onClose } = this.props;
    return (
        <Layer align="right"
               closer={true}
               onClose={onClose}>Hello Again</Layer>
    );
  }
}

TodoAddTaskForm.propTypes = React.PropTypes.func.isRequired;
