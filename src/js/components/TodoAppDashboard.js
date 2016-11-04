import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Meter from 'grommet/components/Meter';
import Section from 'grommet/components/Section';
import Value from 'grommet/components/Value';
import Status from 'grommet/components/icons/Status';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';

function getLabel(label, count, colorIndex) {
  return {
    "label": label,
    "value": count,
    "colorIndex": colorIndex
  };
}

export default class TodoAppDashboard extends Component {

  constructor () {
    super();
    this.state = {
      tasks: [],
      addTask: false
    };
  }

  _onRequestForAddTask = () => {
    this.setState( { addTask: true });
  }

  _onCloseTask = () => {
    this.setState( { addTask: false });
  }

  render () {

    let tasksMap = {
      critical: 0,
      ok: 0,
      warning: 0
    };

    let tasks = this.state.tasks.map((task, index) => {

      tasksMap[task.status] += 1;

      let separator;
      if (index === 0) {
        separator = 'horizontal';
      }
      return (
        <ListItem key={`task_${index}`} separator={separator}
          responsive={false}>
          <Box>
            <Status value={task.status} size='small' />
            <span>{task.item}</span>
          </Box>
        </ListItem>
      );
    }, this);

    let addTaskLayer;
    if (this.state.addTask) {
      addTaskLayer = (
        <Layer align="right"
               closer={true}
               onClose={this._onCloseTask}>Hello Again</Layer>
      );
    }
    const series = [
      getLabel('Past Due', tasksMap.critical, 'critical'),
      getLabel('Due Soon', tasksMap.warning, 'warning'),
      getLabel('Done', tasksMap.ok, 'ok')
    ];

    let value, label;
    if (this.state.index >= 0) {
      value = series[this.state.index].value;
      label = series[this.state.index].label;
    } else {
      value = 0;
      series.forEach(serie => value += serie.value);
      label = 'Total';
    }

    return (
      <Section primary={true} flex={true}>
        <Box direction='row'>
          <Box basis='1/3' align="center">
            <Meter series={series} type="circle" label={false}
              onActive={(index) => this.setState({ index: index })} />
            <Box direction="row" justify="between" align="center"
              responsive={false}>
              <Value value={value} units="xTasks" align="center" label={label} />
            </Box>
          </Box>
          <Box basis='2/3' pad='medium'>
            <Heading tag='h3'>My Tasks</Heading>
            <List>
              {tasks}
            </List>
            <Footer>
              <Button primary={true}
                      label="Add Task"
                      onClick={this._onRequestForAddTask}></Button>
            </Footer>
          </Box>
        </Box>
        { addTaskLayer }
      </Section>
    );
  }
};
