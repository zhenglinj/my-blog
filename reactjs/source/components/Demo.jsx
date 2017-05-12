const tabsInstance = (
  <Tab.Container id="tabs-with-dropdown" defaultActiveKey="1">
    <Row className="clearfix">
      <Col sm={12}>
        <Nav bsStyle="tabs">
          <NavItem eventKey="0" disabled>
            Online Applications
          </NavItem>
          <NavItem eventKey="1">
            Tab 1
          </NavItem>
          <NavItem eventKey="2">
            Tab 2
          </NavItem>
          <NavDropdown eventKey="3" title="Dropdown" id="nav-dropdown-within-tab">
            <MenuItem eventKey="3.1">Action</MenuItem>
            <MenuItem eventKey="3.2">Another action</MenuItem>
            <MenuItem eventKey="3.3">Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="3.4">Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Col>
      <Col sm={12}>
        <Tab.Content animation>
          <Tab.Pane eventKey="1">
            {/* Tab 1 content */}
            <p><Hello prompt="tab1" /></p>
          </Tab.Pane>
          <Tab.Pane eventKey="2">
            {/* Tab 2 content */}
          </Tab.Pane>
          <Tab.Pane eventKey="3.1">
            {/* Tab 3.1 content */}
          </Tab.Pane>
          <Tab.Pane eventKey="3.2">
            {/* Tab 3.2 content */}
          </Tab.Pane>
          <Tab.Pane eventKey="3.3">
            {/* Tab 3.3 content */}
          </Tab.Pane>
          <Tab.Pane eventKey="3.4">
            {/* Tab 3.4 content */}
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
);


class MyNavbar extends Component {
  constructor(state) {
    super(state);
    this.state = {
      activeKey: 1
    };
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop={true}>
        <Row className="clearfix">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav bsStyle="pills" activeKey={this.state.activeKey}
                 onSelect={this.handleSelect.bind(this)}>
              <NavItem eventKey="1">Tab 1</NavItem>
              <NavItem eventKey="2">Tab 2</NavItem>
            </Nav>
          </Navbar.Collapse>
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="1">Tab 1 content
              </Tab.Pane>
              <Tab.Pane eventKey="2">Tab 2 content
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Navbar>
    )
  }
}

export default tabsInstance;
export default MyNavbar;

/* ReactDOM.render(tabsInstance,
 *                 document.getElementById('container'));
 * ReactDOM.render(<MyNavbar />,
 *                 document.getElementById('container'));*/
