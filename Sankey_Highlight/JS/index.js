// var data = {'nodes': [{'name': 'N/A'}, {'name': 'draft'}, {'name': 'created'}, {'name': 'cancelled'}, {'name': 'issued'}, {'name': 'sent_manually'}, {'name': 'sent_via_email'}, {'name': 'purchased_online'}, {'name': 'awaiting_online_purchase'}, {'name': 'scheduled_for_cxml'}, {'name': 'scheduled_for_email'}, {'name': ''}, {'name': 'buyer_hold'}, {'name': 'soft_closed'}, {'name': 'sent_via_cxml'}, {'name': 'not_sent'}, {'name': 'currency_hold'}, {'name': 'scheduled_for_xml'}], 'links': [{'source': 0, 'target': 4, 'value': 2102}, {'source': 4, 'target': 6, 'value': 2392}, {'source': 0, 'target': 1, 'value': 914}, {'source': 1, 'target': 4, 'value': 871}, {'source': 4, 'target': 11, 'value': 5}, {'source': 11, 'target': 5, 'value': 3}, {'source': 5, 'target': 11, 'value': 3}, {'source': 4, 'target': 10, 'value': 167}, {'source': 10, 'target': 6, 'value': 158}, {'source': 6, 'target': 11, 'value': 13}, {'source': 11, 'target': 10, 'value': 3}, {'source': 6, 'target': 13, 'value': 3}, {'source': 4, 'target': 8, 'value': 87}, {'source': 4, 'target': 9, 'value': 10}, {'source': 4, 'target': 7, 'value': 6}, {'source': 4, 'target': 5, 'value': 27}, {'source': 6, 'target': 3, 'value': 5}, {'source': 3, 'target': 5, 'value': 3}, {'source': 8, 'target': 7, 'value': 32}, {'source': 4, 'target': 15, 'value': 1}, {'source': 8, 'target': 10, 'value': 1}, {'source': 1, 'target': 12, 'value': 12}, {'source': 12, 'target': 4, 'value': 6}, {'source': 9, 'target': 14, 'value': 4}, {'source': 4, 'target': 3, 'value': 1}, {'source': 6, 'target': 5, 'value': 3}, {'source': 1, 'target': 2, 'value': 11}, {'source': 10, 'target': 11, 'value': 1}, {'source': 11, 'target': 6, 'value': 1}, {'source': 6, 'target': 10, 'value': 4}, {'source': 2, 'target': 6, 'value': 4}, {'source': 5, 'target': 6, 'value': 3}, {'source': 2, 'target': 3, 'value': 1}, {'source': 9, 'target': 11, 'value': 1}, {'source': 4, 'target': 13, 'value': 1}, {'source': 13, 'target': 4, 'value': 1}, {'source': 10, 'target': 5, 'value': 1}, {'source': 1, 'target': 16, 'value': 1}, {'source': 4, 'target': 17, 'value': 2}, {'source': 8, 'target': 11, 'value': 2}, {'source': 11, 'target': 3, 'value': 1}, {'source': 11, 'target': 15, 'value': 1}, {'source': 12, 'target': 3, 'value': 1}]}

var data = {
  "nodes": [
    {"name": "N/A"},
    {"name": "New"},
    {"name": "Draft"}
  ], "links": [
    {"source": 0, "target": 1,"value": 5},
    {"source": 1, "target": 2,"value": 10},
    {"source": 0, "target": 2,"value": 5}
  ]
}
var width = 2900;
var height = 1400;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " TWh"; },
    color = d3.scale.category20();
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
var path = sankey.link();

function createChart(energy) {
  sankey
      .nodes(energy["nodes"])
      .links(energy["links"])
      .layout(32);

  var link = svg.append("g").selectAll(".link")
      .data(energy.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .attr("id", function(d,i){
        d.id = i;
        return "link-"+i;
      })
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

  link.append("title")
      .text(function(d) { return d.source.name + " -> " + d.target.name + "\n" + format(d.value); });

  var node = svg.append("g").selectAll(".node")
      .data(energy.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click",highlight_node_links)
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      // interfering with click .on("dragstart", function() { this.parentNode.appendChild(this); })
      .on("drag", dragmove));

  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { return d.name + "\n" + format(d.value); });

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

  function highlight_node_links(node,i){
    var remainingNodes=[], nextNodes=[];
    var stroke_opacity = 0;

    if( d3.select(this).attr("data-clicked") == "1" ){
      d3.select(this).attr("data-clicked","0");
      stroke_opacity = 0.2;
    } else {
      d3.select(this).attr("data-clicked","1");
      stroke_opacity = 0.5;
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
    });
  }

  function highlight_link(id,opacity){
      d3.select("#link-"+id).style("stroke-opacity", opacity);
  }
};

createChart(data);
