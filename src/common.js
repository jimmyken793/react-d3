/** @jsx React.DOM */
var React = require('react');
var d3 = require('d3');


exports.Chart = React.createClass({
  render: function() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
      </div>
    );
  }
});

exports.XAxis = React.createClass({

  propTypes: {
    xAxisClassName: React.PropTypes.string.isRequired,
    orient: React.PropTypes.oneOf(['top', 'bottom']),
    xScale: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      xAxisClassName: 'x axis',
      orient: 'bottom'
    };
  },


  componentDidMount: function() {
    this._renderAxis(this.props);
  },

  componentWillReceiveProps: function(props) {
    this._renderAxis(props);
  },

  _renderAxis: function(props) {
    var xAxis = d3.svg.axis()
      .scale(props.xScale)
      .orient("bottom");

    var node = this.refs.xaxis.getDOMNode();

    d3.select(node)
      .attr("class", props.xAxisClassName)
      .call(xAxis);

    // Style each of the tick lines
    d3.select(props.xAxisClassName)
      .selectAll('line')
      .attr("shape-rendering", "crispEdges")
      .attr("stroke", "#000");

    // Style the main axis line
    d3.select(props.xAxisClassName)
      .select('path')
      .attr("shape-rendering", "crispEdges")
      .attr("fill", "none")
      .attr("stroke", "none")

  },

  render: function() {
    var props = this.props;
    var t = "translate(0," + props.height + ")";
    return (
      <g
        ref='xaxis'
        className={props.xAxisClassName}
        transform={t}
      >
      </g>
    );
  }

});


exports.YAxis = React.createClass({

  propTypes: {
    yAxisClassName: React.PropTypes.string,
    orient: React.PropTypes.oneOf(['left', 'right']),
    xScale: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      yAxisClassName: 'y axis',
      orient: 'left'
    };
  },

  componentDidMount: function() {
    this._renderAxis(this.props);
  },

  componentWillReceiveProps: function(props) {
    this._renderAxis(props);
  },

  _renderAxis: function(props) {
    var yAxis = d3.svg.axis()
      .ticks(props.yAxisTickCount)
      .scale(props.yScale)
      .orient(this.props.orient);

    var node = this.refs.yaxis.getDOMNode();

    d3.select(node)
      .attr("class", props.yAxisClassName)
      .call(yAxis);

    // Style each of the tick lines
    d3.selectAll(props.yAxisClassName)
      .selectAll('line')
      .attr("shape-rendering", "crispEdges")
      .attr("stroke", "#000");

    // Style the main axis line
    d3.selectAll(props.yAxisClassName)
      .select('path')
      .attr("shape-rendering", "crispEdges")
      .attr("fill", "none")
      .attr("stroke", "#000")

  },

  render: function() {
    var props = this.props;
    return (
      <g
        ref='yaxis'
        className={props.yAxisClassName}
      >
      </g>
    );
  }

});
