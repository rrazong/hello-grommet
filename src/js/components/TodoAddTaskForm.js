import React from 'react';
import Layer from 'grommet/components/Layer';
//import Header from 'grommet/components/Header';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';

export default class TodoAddTaskForm extends React.Component {
  constructor() {
    super();

    this.state = {
      label: undefined,
      status: undefined
    };
  }

  _onSubmit = (e) => {
    const { label, status } = this.state;
    const { onClose, onSubmit } = this.props;
    console.log('_onSubmit called', this.state);
    e.preventDefault();
    if (label) {
      onSubmit({
        label,
        status : status || 'ok'
      });
    }

    onClose();
  }

  _onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  }

  _onStatusChange = (e) => {
    this.setState({
      status: e.target.value
    });
  }

  render() {
    const { onClose } = this.props;
    return (
        <Layer align="right"
               closer={true}
               onClose={onClose}>
          <header>
            <h1>Add Task</h1>
          </header>
          <Form onSubmit={this._onSubmit}>
            <FormFields>
              <fieldset>
                <FormField label="Task" htmlFor="labelId">
                  <input type="text" name="label" id="labelId" onChange={this._onLabelChange}/>
                </FormField>
                <FormField label="Status" htmlFor="statusId">
                  <select name="status" id="statusId" onChange={this._onStatusChange}>
                    <option value="ok">Done</option>
                    <option value="warning">Due soon</option>
                    <option value="critical">Past Due</option>
                  </select>
                </FormField>
              </fieldset>
            </FormFields>
            <Footer pad={{ vertical: 'small' }}>
              <Box>
                <Button primary={true}
                        onClick={this._onSubmit}
                        label="Add" />
              </Box>
              <Box pad={{ horizontal: 'small' }}>
                <Button onClick={onClose}
                        label="Cancel" />
              </Box>
            </Footer>
          </Form>

        </Layer>
    );
  }
}

TodoAddTaskForm.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};
