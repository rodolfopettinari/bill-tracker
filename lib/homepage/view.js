/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');
var WorkflowView = require('bill-workflow');
var DiffView = require('bill-diff');
var BillView = require('bill-view');
var SidebarView = require('sidebar');

/**
 * Expose HomepageView
 */

module.exports = HomepageView;

/**
 * Creates `HomepageView`
 */
function HomepageView() {
  if (!(this instanceof HomepageView)) {
    return new HomepageView();
  }

  View.call(this, template);
  this.appendElementsToMainView();
}

/**
 * Inherit from View
 */
View(HomepageView);


HomepageView.prototype.appendElementsToMainView = function () {
  var mainView =  this.el.find('section.site-content #homepage');
  var billView = new BillView();
  mainView.append(billView.el);

  var workflowView = new WorkflowView();
  mainView.append(workflowView.el);

  var diffView = new DiffView();
  mainView.append(diffView.el);
  workflowView.on('step change', diffView.changeBillContent.bind(diffView));

  //Add sidebar to the nav bar.
  var sidebar = new SidebarView();
  var sidebarContainer =  this.el.find('aside.nav');
  sidebarContainer.append(sidebar.el);

  sidebar.on('sidebar:click-at', billView.loadBill.bind(billView));
  sidebar.on('sidebar:click-at', workflowView.loadSteps.bind(workflowView));
};

