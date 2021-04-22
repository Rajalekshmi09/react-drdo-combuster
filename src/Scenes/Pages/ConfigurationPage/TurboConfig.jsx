import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTurboConfig, updateTitleElements } from '../../../Redux/action';
import { turbineConfigSubmit } from '../../../Services/requests';
import { Col, Row, Layout, Input, Button, Tooltip, InputNumber, DatePicker, Form } from 'antd';
import TableElement from '../../Components/subComponents/TableElement';
import moment from 'moment';
import 'moment/locale/zh-cn';

class TurboConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nozzle_area: null,
    }
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Turbo Config',
      type: 'Config',
    })
  }
  onFinish = (values) => {
    turbineConfigSubmit(values, (data) => {
      this.props.updateTurboConfig(data)
    })
  }

  render() {
    const { appData } = this.props;
    const { turboConfig } = appData;
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2">Turbo Configuration</h2>
          <Form onFinish={this.onFinish}>
            <Row style={{ paddingTop: "20px" }} >
              <Col sm={2}>
                <label class="label" >Turbo ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={6}>
                <Form.Item name="turbo_id">
                  <Input style={{ width: "320px" }} placeholder="Turbo ID" />
                </Form.Item>
              </Col>
              <Col sm={3}>
                <label htmlFor="name" class="label" >Installed Date<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={5}>
                <Input.Group compact>
                  <DatePicker defaultValue={moment(Date.Now)} style={{ backgroundColor: "#131633" }} />
                </Input.Group >
              </Col>
              <Col sm={2}>
                <label class="label">Nozzle Area<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={6}>
                <div>
                  <Form.Item
                    name="nozzle_area" >
                    <Tooltip placement="bottom" title='Range 0.0002 to 0.0005 m2' style={{ backgroundColor: 'pink' }}>
                      <InputNumber
                        name="nozzle_area"
                        min={0.0002} max={0.0005}
                        defaultValue={0.0245}
                        step={0.0001}
                        style={{ width: "320px" }}
                      //  onChange={this.handleNumber}
                      />
                    </Tooltip>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col sm={2}>
                <label class="label" >Description <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={6}>
                <Form.Item name="description">
                  <Input style={{ height: "100px", width: "805px" }} placeholder="Description..." />
                </Form.Item>
              </Col>
            </Row>

            <Row sm={6} style={{ paddingTop: '25px', paddingLeft: "35%", paddingBottom: '30px' }}>
              <Col xs={4}>
                <Form.Item>
                  <Button htmlType="submit" > Save</Button>  </Form.Item>
              </Col>
              <Col xs={4}>
                <Button> Clear</Button>
              </Col>

            </Row>
          </Form>
        </Layout>
        <div style={{ paddingTop: "35px" }}>
          <Layout class="bottom-container">
            <Row>
              <Col span={8}>
                <h2 class="h2">Turbo Configuration</h2>
              </Col>
            </Row>
            {turboConfig ?
              <TableElement
                data={turboConfig}
                editable={true}
                editableColumn={["status"]}
                childrenColumnName={"Turbo Config"}
              /> : []}
          </Layout>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  appData: state.app
})

const mapDispatchToProps = {
  updateTurboConfig,
  updateTitleElements
}

const TurboContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurboConfig)
export default TurboContainer;