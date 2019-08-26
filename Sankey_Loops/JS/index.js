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

function createChart(energy) {
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

  var node = svg.append("g").attr("id", "node-container")
      .selectAll(".node")
      .data(energy.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click",highlight_node_links)
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
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

    function highlight_node_links(node,i) {
      var remainingNodes=[],
      nextNodes=[];
      var stroke_opacity = 0;
      if( d3.select(this).attr("data-clicked") == "1" ){
        d3.select(this).attr("data-clicked","0");
        stroke_opacity = 0.5;
      }else{
        d3.select(this).attr("data-clicked","1");
        stroke_opacity = 1;
      }

      var traverse = [{
                        linkType : "sourceLinks",
                        nodeType : "target"
                      },{
                        linkType : "targetLinks",
                        nodeType : "source"
                      }];

      traverse.forEach(function(step){
        node[step.linkType].forEach(function(link) {
          remainingNodes.push(link[step.nodeType]);
          console.log(link.id);
          highlight_link(link.id, stroke_opacity);
        });

        while (remainingNodes.length) {
          nextNodes = [];
          remainingNodes.forEach(function(node) {
            node[step.linkType].forEach(function(link) {
              nextNodes.push(link[step.nodeType]);

              highlight_link(link.id, stroke_opacity);
            });
          });
          remainingNodes = nextNodes;
        }
        debugger;
  });
}

function highlight_link(id,opacity){
    d3.select("#link-"+id).style("stroke-opacity", opacity);
}

};

let json_data = [{'to': 'issued', 'from': 'N/A', 'weight': 2102}, {'to': 'sent_via_email', 'from': 'issued', 'weight': 2392}, {'to': 'draft', 'from': 'N/A', 'weight': 914}, {'to': 'issued', 'from': 'draft', 'weight': 871}, {'to': 'scheduled_for_email', 'from': 'issued', 'weight': 167}, {'to': 'sent_via_email', 'from': 'scheduled_for_email', 'weight': 158}, {'to': 'soft_closed', 'from': 'sent_via_email', 'weight': 3}, {'to': 'awaiting_online_purchase', 'from': 'issued', 'weight': 87}, {'to': 'scheduled_for_cxml', 'from': 'issued', 'weight': 10}, {'to': 'purchased_online', 'from': 'issued', 'weight': 6}, {'to': 'sent_manually', 'from': 'issued', 'weight': 27}, {'to': 'cancelled', 'from': 'sent_via_email', 'weight': 5}, {'to': 'sent_manually', 'from': 'cancelled', 'weight': 3}, {'to': 'purchased_online', 'from': 'awaiting_online_purchase', 'weight': 32}, {'to': 'not_sent', 'from': 'issued', 'weight': 1}, {'to': 'scheduled_for_email', 'from': 'awaiting_online_purchase', 'weight': 1}, {'to': 'buyer_hold', 'from': 'draft', 'weight': 12}, {'to': 'issued', 'from': 'buyer_hold', 'weight': 6}, {'to': 'sent_via_cxml', 'from': 'scheduled_for_cxml', 'weight': 4}, {'to': 'cancelled', 'from': 'issued', 'weight': 1}, {'to': 'sent_manually', 'from': 'sent_via_email', 'weight': 3}, {'to': 'created', 'from': 'draft', 'weight': 11}, {'to': 'scheduled_for_email', 'from': 'sent_via_email', 'weight': 4}, {'to': 'sent_via_email', 'from': 'created', 'weight': 4}, {'to': 'sent_via_email', 'from': 'sent_manually', 'weight': 3}, {'to': 'cancelled', 'from': 'created', 'weight': 1}, {'to': 'soft_closed', 'from': 'issued', 'weight': 1}, {'to': 'issued', 'from': 'soft_closed', 'weight': 1}, {'to': 'sent_manually', 'from': 'scheduled_for_email', 'weight': 1}, {'to': 'currency_hold', 'from': 'draft', 'weight': 1}, {'to': 'scheduled_for_xml', 'from': 'issued', 'weight': 2}]





// This loads the data into the DataObject which takes a dictionary and is able
// create the dataobject.
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
      link.id = "link-"+i;;
      dataObject.links[i] = link;
    }
//==============================================================================
  return dataObject;
}

var energyData = loadData(json_data);
createChart(energyData);


/*
Data Points that circle from the same source to the same target have been taken layout
Data Points that have no from or to have also been scrapped.
*/
