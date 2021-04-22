import React, { Component } from 'react';
import { Col, Row, Layout, Input, Select } from 'antd';
import { connect } from 'react-redux';
import RadioButton from '../subComponents/RadioButton';
import ListItems from '../../Components/subComponents/ListItems';
import axios from 'axios';

const { Option } = Select;

class TestDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      turboIdval: null,
      currentTesterItem: null,
      currentWitnessItem: null,
      isDuplicateTester: false,
      isDuplicateWitness: false
    }
    this.addItem = this.addItem.bind(this);
    this.handleTesterInput = this.handleTesterInput.bind(this);
    this.handleWitnessInput = this.handleWitnessInput.bind(this);
    this.deleteTesterItem = this.deleteTesterItem.bind(this);
    this.deleteWitnessItem = this.deleteWitnessItem.bind(this);
  }

  addItem(e, key) {
    e.preventDefault();
    const { currentTesterItem, currentWitnessItem, testerItems, witnessItems } = this.state
    const newItem = key === 'tester' ? currentTesterItem : currentWitnessItem
    const isDuplicateTester = testerItems.includes(newItem);
    const isDuplicateWitness = witnessItems.includes(newItem);
    if (isDuplicateTester) {
      this.setState({
        isDuplicateTester: isDuplicateTester
      })
      alert('duplicate value')
    }

    if (isDuplicateWitness) {
      this.setState({
        isDuplicateWitness: isDuplicateWitness
      })
      alert('duplicate value')
    }

    if (newItem !== null && !isDuplicateTester && !isDuplicateWitness) {
      key === 'tester' ?
        this.setState({
          testerItems: [...testerItems, newItem],
          currentTesterItem: null
        }) :
        this.setState({
          witnessItems: [...witnessItems, newItem],
          currentWitnessItem: null
        })
    }
  }
  handleTesterInput(e) {
    this.setState({
      currentTesterItem: e.target.value
    })
  }
  handleWitnessInput(e) {
    this.setState({
      currentWitnessItem: e.target.value
    })
  }
  deleteTesterItem(text) {
    const filteredItems = this.state.testerItems.filter(item => item !== text);
    this.setState({
      testerItems: filteredItems
    })
  }

  deleteWitnessItem(text) {
    const filteredItems = this.state.witnessItems.filter(item => item !== text);
    this.setState({
      witnessItems: filteredItems
    })
  }

  onChangeTurboId = (e) => {
    this.getTestData()
    console.log(this.state.turboIdval)
  }

  getTestData = () => {
    axios.post('http://192.168.0.167:5000/gettestid.php', "hii").then(res => {
      let testingData = res.data
      this.props.updateTestingPage(testingData)
      console.log(testingData)
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    const testIdValue = this.props.app.turboConfig;
    const { value } = this.state;
    return (
      <div style={{ paddingTop: "30px" }}>
        <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
          <Row>
            <Col xs={8} style={{ paddingLeft: "20px" }}>
              <form>
                <Row>
                  <Col xs={5}>
                    <label for="text" class="label" >Mode</label>
                  </Col>
                  <RadioButton />
                </Row>
              </form>
            </Col>
          </Row>
          <Row style={{ paddingTop: "28px", paddingLeft: "20px" }}>
            <Col span={8}>
              <form >
                <Row>
                  <Col span={5}>
                    <label for="text" class="label" >Turbo ID</label>
                  </Col>
                  <Col span={6}>
                    <Input.Group compact>
                      <Select
                        defaultValue="Select Turbo ID"
                        style={{ width: '300px' }}
                        onChange={this.onChangeTurboId}
                        value={this.state.turboIdVal}
                      >
                        {testIdValue.map(it => (
                          <Option key={it.turboname} value={it.turboname}>
                            {it.turboname}
                          </Option>
                        ))}
                      </Select>
                    </Input.Group>
                  </Col>
                </Row>
              </form>
              <Row style={{ paddingLeft: '5rem' }}>
                {this.state.turboIdval}
              </Row>
            </Col>
            <Col xs={8}>
              <form onSubmit={(e) => this.addItem(e, 'tester')}>
                <Row>
                  <Col span={4}>
                    <label for="text" class="label" >Tester</label>
                  </Col>
                  <Col span={15} >
                    <Input placeholder="Tester"
                      name="Tester"
                      style={{ width: "300px" }}
                      value={this.state.currentTesterItem}
                      onChange={this.handleTesterInput}
                    />
                  </Col>
                  <Col>
                    <button
                      style={{ width: "2em", height: '3em', backgroundColor: '#42dbdc' }}
                      type="submit"
                    >+</button>
                  </Col>
                </Row>
              </form>
              <Row style={{ paddingLeft: '5rem' }}>
                <ListItems items={this.state.testerItems} deleteItem={this.deleteTesterItem} />
              </Row>
            </Col>

            <Col xs={8}>
              <form onSubmit={(e) => this.addItem(e, 'witness')}>
                <Row>
                  <Col span={4}>
                    <label for="text" class="label" >Witness</label>
                  </Col>
                  <Col span={15}>
                    <Input placeholder="Witness"
                      name="Witness"
                      style={{ width: "300px" }}
                      placeholder="Enter Witness"
                      value={this.state.currentWitnessItem}
                      onChange={this.handleWitnessInput}
                      onfocus="this.value=''"
                    />
                  </Col>
                  <Col>
                    <button
                      style={{ width: "2em", height: '3em', backgroundColor: '#42dbdc' }}
                      type="submit"
                    >+</button>
                  </Col>
                </Row>
              </form>
              <Row style={{ paddingLeft: '5rem' }}>
                <ListItems items={this.state.witnessItems} deleteItem={this.deleteWitnessItem} />
              </Row>
            </Col>
          </Row>
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {}

const Grid = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestDetails)
export default Grid;
