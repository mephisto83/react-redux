import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import BlendedBatch from '../components/BlendedBatch'
import * as JobActions from '../actions/jobAction'
import React, {
  Component,
  PropTypes
} from 'react'
const Colors = require('material-ui/lib/styles/colors');
const AppBar = require('material-ui/lib/app-bar');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const IconButton = require('material-ui/lib/icon-button');
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const LeftNav = require('material-ui/lib/left-nav')
const FlatButton = require('material-ui/lib/flat-button');
let Menu = require('material-ui/lib/menus/menu');
import {Link} from 'react-router';
let FontIcon = require('material-ui/lib/font-icon');
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');
let injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

export function mapStateToProps (_state) {
  var state = _state.default;
  return {jobDic: state.jobReducer.jobDic, jobs: state.jobReducer
      .jobs
      .map(x => {
        if (!state.jobReducer.jobDic[x]) {
          console.log('missing job');
        }
        return state.jobReducer.jobDic[x];
      }), currentJob: state.jobReducer.currentJob, currentJobDetails: state.jobReducer.currentJobDetails, isRequesting: state.jobReducer.isRequesting, initialized: state.jobReducer.initialized};
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(JobActions, dispatch)
}
class App extends Component {
  //        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
  constructor (props) {
    super(props);
    this._openMenu = this._openMenu
      .bind(this);
  }
  _openMenu () {
    this.refs
      .leftNav
      .toggle();
  }
  render () {
    var menuItems = [
      {
        route: '/',
        text: 'Home'
      }, {
        route: '/newjob',
        text: 'New job'
      }
    ];
    return (
      <div>
        <AppBar title="Blended" onLeftIconButtonTouchTap={this._openMenu}/>
        <LeftNav ref="leftNav" docked={false}>
          <div>
            <Link to="/"><FlatButton style={{width: '100%'}} label="Home"/></Link>
          </div>
          <div>
            <Link to="/newjob"><FlatButton style={{width: '100%'}} label="New Job"/></Link>
          </div>
        </LeftNav>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {}
export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default connect(mapStateToProps, mapDispatchToProps)(BlendedBatch)
//export default connect(mapStateToProps, mapDispatchToProps)(Details)
