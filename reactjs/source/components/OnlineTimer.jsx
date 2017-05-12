import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

import SimpleTimer from './SimpleTimer.jsx';


const tmcTimerListParams = [
  { name: "Reception", totalSeconds: 600 },
  { name: "Toastmaster and Host Introduciton", totalSeconds: 120 },
  { name: "Meeting Introduciton", totalSeconds: 120 },
  { name: "Introduce guests", totalSeconds: 300 },
  { name: "Warm-up", totalSeconds: 420 },

  { name: "General Evaluator", totalSeconds: 60 },
  { name: "Timer", totalSeconds: 60 },
  { name: "Ah counter", totalSeconds: 60 },
  { name: "Grammarian", totalSeconds: 120 },

  { name: "Table Topic", totalSeconds: 1200 },
  { name: "Evaluator", totalSeconds: 30 },
  { name: "Prepared Speech", totalSeconds: 360 },
  { name: "Q&A", totalSeconds: 120 },

  { name: "Table Topic Evaluation", totalSeconds: 300 },
  { name: "Speech Evaluation", totalSeconds: 180 },

  { name: "General Evalution", totalSeconds: 420 },
  { name: "Timer", totalSeconds: 120 },
  { name: "Ah counter", totalSeconds: 120 },
  { name: "Grammarian", totalSeconds: 180 },

  { name: "Voting Time", totalSeconds: 60 },
  { name: "Let Guests Talk", totalSeconds: 420 },
  { name: "Reward", totalSeconds: 300 },
  { name: "Closing Remarks", totalSeconds: 60 },
];

export default class TmcTimer extends Component {
  constructor(props) {
    super(props);

    let num = 0;
    let timerList = [];
    let timerListParams = tmcTimerListParams;
    timerList.push(tmcTimerListParams.map((param) => {
      num = num + 1;
      return (<SimpleTimer key={param.name + num}
                           name={param.name}
                           totalSeconds={param.totalSeconds} />)
    }));

    this.state = {
      num: num,
      timerListParams: timerListParams,
      timerList: timerList
    };
  }

  addTimer () {
    let num = this.state.num + 1;
    let timerListParams = this.state.timerListParams;
    timerListParams.push({name: "Timer " + num, totalSeconds: 120});
    let timerList = this.state.timerList;
    timerList.push(<SimpleTimer key={"Timer " + num}
                    name={"Timer " + num}
                    totalSeconds={120}  />);
    this.setState({
      num: num,
      timerListParams: timerListParams,
      timerList: timerList
    });
  }

  render() {

    return (
      <Grid>
        <Row>
          <Col xs={12} xsOffset={0} md={10} mdOffset={1}>
            <PageHeader>Online Timer <small>for ToastMaster</small></PageHeader>
            {this.state.timerList}
            <Button bsStyle="link" onClick={this.addTimer.bind(this)}>+ Add another timer</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
