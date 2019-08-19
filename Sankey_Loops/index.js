var width = 2900; //Height of the Sankey Diagram
var height = 1400; //Width of the Sankey Diagram

var format = function(d) { // This is what appears when you hover over the node
  return d + " items";
}

var color = d3.scale.category20(); // Color of the node

var sankey = d3.sankey()
    .nodeWidth(30) //The width of each node in the diagram
    .nodePadding(40) //Separation between the nodes in the diagram
    .size([width, height]); //The size of the sankey diagram


// Creates the svg which is the sankey diagram
var svg = d3.select("#chart").append("svg")
  .attr( "preserveAspectRatio", "xMinYMid meet")
  .attr("width", width)
  .attr("height", height + 10)



var path = sankey.link(); //Creates the links between the nodes

function createChart( energy ) {
  sankey
      .nodes(energy.nodes)
      .links(energy.links)
      .layout(32);

  var allgraphics = svg.append("g").attr("id", "node-and-link-container" );
  var link = allgraphics.append("g").attr("id", "link-container")
      .selectAll(".link")
      .data(energy.links)
    .enter().append("path")
      .attr("class", function(d) { return (d.causesCycle ? "cycleLink" : "link") })
      .attr("d", path)
	  .sort(function(a, b) { return b.dy - a.dy; });

  link.filter( function(d) { return !d.causesCycle} )
	.style("stroke-width", function(d) { return Math.max(1, d.dy); })

  link.append("title")
      .text(function(d) {
        var return_string =  d.source.name + " -> " + d.target.name + "\n";
        var length_of_full_string = d.source.name.length + d.target.name.length + 6;
        var dash = "";
        for (var i = 0; i < length_of_full_string; i++) {
          dash += "-";
        }
        return_string += dash + "\n ";
        if (d.value > 1) {
          return_string += d.value + " items";
        } else {
          return return_string + d.value + " item";
        }
        return return_string;
      });

  var node = allgraphics.append("g").attr("id", "node-container")
      .selectAll(".node")
      .data(energy.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { this.parentNode.appendChild(this); })
      .on("drag", dragmove));

  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { return d3.rgb(d.color).darker(5); })
    .append("title")
      .text(function(d) {
        return d.name + "\n" + format(d.value);
      });

  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

  function dragmove(d) {
    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
  }

  // I need to learn javascript
  var numCycles = 0;
  for( var i = 0; i< sankey.links().length; i++ ) {
    if( sankey.links()[i].causesCycle ) {
      numCycles++;
    }
  }

  var cycleTopMarginSize = (sankey.cycleLaneDistFromFwdPaths() -
	    ( (sankey.cycleLaneNarrowWidth() + sankey.cycleSmallWidthBuffer() ) * numCycles ) )
  var horizontalMarginSize = ( sankey.cycleDistFromNode() + sankey.cycleControlPointDist() ) ;

  svg = d3.select("#chart").select("svg")
    .attr( "viewBox",
	  "" + (0 - horizontalMarginSize ) + " "         // left
	  + cycleTopMarginSize + " "                     // top
	  + (10 + horizontalMarginSize * 2 ) + " "     // width
	  + (2000 + (-1 * cycleTopMarginSize)) + " " );  // height
};

let json_data = [
  { to: 'new', from: 'N/A', weight: 117 },
  { to: 'draft', from: 'new', weight: 271 },
  { to: 'on_hold', from: 'draft', weight: 90 },
  { to: 'approved', from: 'on_hold', weight: 75 },
  { to: 'approved', from: 'draft', weight: 108 },
  { to: 'voided', from: 'N/A', weight: 2 },
  { to: 'on_dispute', from: 'on_hold', weight: 1 },
  { to: 'approved', from: 'on_dispute', weight: 2 },
  { to: 'withdrawn', from: 'on_hold', weight: 2 },
  { to: 'approved', from: 'new', weight: 6 },
  { to: 'approved', from: 'N/A', weight: 1 },
  { to: 'on_hold', from: 'new', weight: 133 },
  { to: 'approved', from: 'pending_receipt', weight: 7 },
  { to: 'processing', from: 'draft', weight: 33 },
  { to: 'pending_approval', from: 'on_hold', weight: 24 },
  { to: 'approved', from: 'pending_approval', weight: 2 },
  { to: 'on_hold', from: 'processing', weight: 9 },
  { to: 'approved', from: 'processing', weight: 7 },
  { to: 'voided', from: 'draft', weight: 1 },
  { to: 'ap_hold', from: 'draft', weight: 4 },
  { to: 'ap_hold', from: 'processing', weight: 6 },
  { to: 'disputed', from: 'pending_approval', weight: 1 },
  { to: 'voided', from: 'disputed', weight: 1 },
  { to: 'on_hold', from: 'ap_hold', weight: 7 },
  { to: 'disputed', from: 'draft', weight: 2 },
  { to: 'disputed', from: 'new', weight: 1 },
  { to: 'disputed', from: 'processing', weight: 1 },
  { to: 'processing', from: 'new', weight: 6 },
  { to: 'approved', from: 'disputed', weight: 1 },
  { to: 'pending_receipt', from: 'draft', weight: 5 },
  { to: 'pending_receipt', from: 'processing', weight: 5 },
  { to: 'pending_approval', from: 'processing', weight: 5 },
  { to: 'pending_approval', from: 'pending_receipt', weight: 1 },
  { to: 'pending_approval', from: 'new', weight: 1 },
  { to: 'pending_approval', from: 'draft', weight: 1 },
  { to: 'ap_hold', from: 'new', weight: 2 },
  { to: 'draft2', from: 'pending_approval', weight: 1 },
  { to: 'draft', from: 'pending_approval', weight: 1 },
  { to: 'booking_hold', from: 'processing', weight: 2 }
];

function insideArray (array, element) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == element) {
      return true;
    }
  }
  return false;
}

function loadData (data) {
  var already_counted = [];
  var new_data = [];
  var new_data_reversed = [];
  var number_of_elements = 0;

  for (var i = 0; i < data.length; i++) {
    if (!insideArray(already_counted, data[i]["to"])) {
      var key = number_of_elements + "";
      new_data[number_of_elements] = {
        [data[i]["to"]] : key
      }
      new_data_reversed[number_of_elements] = {
        [key] : data[i]["to"]
      }
      number_of_elements += 1;
      already_counted.push(data[i]["to"])
    }

    if (!insideArray(already_counted, data[i]["from"])) {
      let key = number_of_elements + ""
      new_data[number_of_elements] = {
        [data[i]["from"]] : key
      }
      new_data_reversed[number_of_elements] = {
        [key] : data[i]["from"]
      }
      number_of_elements += 1;
      already_counted.push(data[i]["from"])
    }
  }
  var one_dict = {};
  for (var i = 0; i < new_data_reversed.length; i++) {
    one_dict[new_data_reversed[i][i]] = i
  }
//==============================================================================
    var dataObject = new Object();
    var numNodes = new_data.length;
    var numLinks = data.length;

    dataObject.nodes = new Array();
    for (var i = 0; i < numNodes; i++) {
      var node = new Object();
      node.name = new_data_reversed[i][i];
      dataObject.nodes[i] = node;
    }

    dataObject.links = new Array();
    for (var i = 0; i < numLinks; i++) {
      var link = new Object();
      link.source = one_dict[data[i]["from"]]
      link.target = one_dict[data[i]["to"]]
      link.value = data[i]["weight"];
      dataObject.links[i] = link;
    }
//==============================================================================
  return dataObject;
}

var energyData = loadData(json_data);
createChart(energyData);
