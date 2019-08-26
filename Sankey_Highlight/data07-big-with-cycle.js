sankeyDraw(
  {
    'nodes': [
      {name: "a"},
      {name: "b"},
      {name: "c"},
      {name: "d"},
      {name: "e"},
      {name: "f"},
      {name: "g"},
      {name: "h"},
      {name: "i"},
      {name: "j"},
      {name: "k"},
      {name: "l"},
      {name: "m"},
      {name: "n"},
      {name: "o"},
      {name: "p"},
      {name: "q"},
      {name: "r"},
      {name: "s"},
      {name: "t"},
      {name: "u"},
      {name: "v"},
      {name: "w"},
      {name: "x"},
      {name: "y"},
      {name: "z"},
      {name: "aa"},
      {name: "ab"},
      {name: "ac"},
      {name: "ad"},
      {name: "ae"},
      {name: "af"},
      {name: "ag"},
      {name: "ah"},
      {name: "ai"},
      {name: "aj"},
      {name: "ak"},
      {name: "al"},
      {name: "am"},
      {name: "an"},
      {name: "ao"},
      {name: "ap"},
      {name: "aq"},
      {name: "ar"},
      {name: "as"},
      {name: "at"},
      {name: "au"},
      {name: "av"},
      {name: "aw"},
      {name: "ax"}
    ],
    'links': [
      {"source": 1, "target": 2, "value": 74},
      {"source": 2, "target": 3, "value": 64},
      {"source": 2, "target": 4, "value": 46},
      {"source": 4, "target": 5, "value": 45},
      {"source": 5, "target": 6, "value": 45},
      {"source": 7, "target": 8, "value": 45},
      {"source": 8, "target": 9, "value": 65},
      {"source": 10, "target": 11, "value": 42},
      {"source": 12, "target": 13, "value": 20},
      {"source": 12, "target": 14, "value": 32},
      {"source": 14, "target": 15, "value": 42},
      {"source": 12, "target": 16, "value": 427},
      {"source": 16, "target": 17, "value": 111},
      {"source": 16, "target": 19, "value": 304},
      {"source": 19, "target": 20, "value": 133},
      {"source": 19, "target": 21, "value": 155},
      {"source": 21, "target": 22, "value": 155},
      {"source": 22, "target": 23, "value": 155},
      {"source": 19, "target": 24, "value": 62},
      {"source": 26, "target": 27, "value": 51},
      {"source": 26, "target": 28, "value": 552},
      {"source": 28, "target": 29, "value": 552},
      {"source": 29, "target": 30, "value": 99},
      {"source": 29, "target": 31, "value": 443},
      {"source": 31, "target": 32, "value": 431},
      {"source": 32, "target": 33, "value": 431},
      {"source": 26, "target": 34, "value": 73},
      {"source": 34, "target": 35, "value": 34},
      {"source": 35, "target": 36, "value": 52},
      {"source": 26, "target": 37, "value": 607},
      {"source": 37, "target": 38, "value": 138},
      {"source": 37, "target": 39, "value": 75},
      {"source": 37, "target": 40, "value": 456},
      {"source": 40, "target": 41, "value": 181},
      {"source": 40, "target": 42, "value": 250},
      {"source": 40, "target": 43, "value": 34},
      {"source": 43, "target": 44, "value": 45},
      {"source": 44, "target": 45, "value": 74},
      {"source": 42, "target": 46, "value": 249},
      {"source": 46, "target": 47, "value": 249},
      {"source": 40, "target": 48, "value": 73},
      {"source": 48, "target": 49, "value": 53},
      {"source": 48, "target": 12, "value": 43},
      {"source": 16, "target": 3, "value": 43},
      {"source": 46, "target": 33, "value": 43},
      {"source": 26, "target": 8, "value": 63},
      {"source": 31, "target": 16, "value": 43},
      {"source": 15, "target": 7, "value": 43},
      {"source": 25, "target": 14, "value": 80},
      {"source": 16, "target": 48, "value": 80},
      {"source": 15, "target": 12, "value": 100},
      {"source": 38, "target": 39, "value": 53},
      {"source": 39, "target": 37, "value": 54},
      {"source": 33, "target": 41, "value": 80},
      {"source": 32, "target": 28, "value": 235},
      {"source": 14, "target": 1, "value": 34},
      {"source": 0, "target": 10, "value": 34},
      {"source": 25, "target": 0, "value": 60},
      {"source": 41, "target": 47, "value": 60},
      {"source": 47, "target": 3, "value": 23},
      {"source": 41, "target": 40, "value": 45},
      {"source": 6, "target": 18, "value": 90}
    ],
    'sinksRight': false
  }
);
 index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sankey Diagram Example</title>
  <style>
    body {
      font-family: sans-serif;
    }
    .node rect {
      fill-opacity: .9;
      shape-rendering: crispEdges;
    }
    .link {
      fill: none;
      stroke: #024;
      stroke-opacity: .2;
    }
    .link:hover {
      stroke-opacity: .5;
    }
    .link.backwards {
      stroke: #402;
      stroke-dasharray: 9,1;
    }
  </style>
</head>
<body>

<div id="data-set-select"></div>
<div id="chart"></div>

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="sankey.js"></script>
<script>
  // Some setup stuff.
  var margin = {top: 20, right: 20, bottom: 20, left: 20};
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  var color = d3.scale.category20();
  // SVG (group) to draw in.
  var svg = d3.select("#chart").append("svg")
          .attr({
            width: width + margin.left + margin.right,
            height: height + margin.top + margin.bottom
          })
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var linksGroup = svg.append("g").attr('class', 'links');
  var nodesGroup = svg.append("g").attr('class', 'nodes');
  // Set up Sankey object.
  var sankey = d3.sankey()
          .nodeWidth(30)
          .nodePadding(5)
          .size([width, height]);
  // Get path data generator
  var path = sankey.link();
  // Callback to draw on a data set.
  function sankeyDraw(data) {
    sankey.nodes(data.nodes)
            .links(data.links)
            .sinksRight('sinksRight' in data ? data.sinksRight : true)
            .layout(32);
    // Draw the links.
    var links = linksGroup.selectAll('.link').data(data.links);
    // Enter
    links.enter()
            .append("path")
            .attr('class', 'link');
    // Enter + Update
    links.attr('d', path)
            .style("stroke-width", function (d) {
              return Math.max(1, d.dy);
            });
    links.classed('backwards', function (d) { return d.target.x < d.source.x; });
    links.append("title")
            .text(function (d) {
              return d.source.name + " to " + d.target.name + " = " + d.value;
            });
    // Exit
    links.exit().remove();
    // Draw the nodes.
    var nodes = nodesGroup.selectAll('.node').data(data.nodes);
    // Enter
    var nodesEnterSelection = nodes.enter()
            .append("g")
            .attr('class', 'node');
    nodesEnterSelection.append("rect")
            .attr('width', sankey.nodeWidth())
            .append("title");
    nodesEnterSelection.append("text")
            .attr('x', sankey.nodeWidth() / 2)
            .attr('dy', ".35em")
            .attr("text-anchor", "middle")
            .attr('transform', null);
    // Enter + Update
    nodes
            .attr('transform', function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            });
    nodes.select('rect')
            .attr('height', function (d) {
              return d.dy;
            })
            .style('fill', function (d) {
              return d.color = color(d.name.replace(/ .*/, ""));
            })
            .style('stroke', function (d) {
              return d3.rgb(d.color).darker(2);
            });
    nodes.select('rect').select('title')
            .text(function (d) {
              return d.name;
            });
    nodes.select('text')
            .attr('y', function (d) {
              return d.dy / 2;
            })
            .text(function (d) {
              return d.name;
            });
    // Exit
    nodes.exit().remove();
  }
</script>
<script src="data07-big-with-cycle.js"></script>
</body>
</html>
 sankey.js
d3.sankey = function() {
  var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      size = [1, 1],
      nodes = [],
      links = [],
      sinksRight = true;

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

 sankey.sinksRight = function (_) {
    if (!arguments.length) return sinksRight;
    sinksRight = _;
    return sankey;
 };

  sankey.layout = function(iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkDepths();
    return sankey;
  };

  // SVG path data generator, to be used as "d" attribute on "path" element selection.
  sankey.link = function() {
    var curvature = .5;

    function link(d) {
      var xs = d.source.x + d.source.dx,
          xt = d.target.x,
          xi = d3.interpolateNumber(xs, xt),
          xsc = xi(curvature),
          xtc = xi(1 - curvature),
          ys = d.source.y + d.sy + d.dy / 2,
          yt = d.target.y + d.ty + d.dy / 2;

      if (!d.cycleBreaker) {
        return "M" + xs + "," + ys
             + "C" + xsc + "," + ys
             + " " + xtc + "," + yt
             + " " + xt + "," + yt;
      } else {
        var xdelta = (1.5 * d.dy + 0.05 * Math.abs(xs - xt));
        xsc = xs + xdelta;
        xtc = xt - xdelta;
        var xm = xi(0.5);
        var ym = d3.interpolateNumber(ys, yt)(0.5);
        var ydelta = (2 * d.dy + 0.1 * Math.abs(xs - xt) + 0.1 * Math.abs(ys - yt)) * (ym < (size[1] / 2) ? -1 : 1);
        return "M" + xs + "," + ys
             + "C" + xsc + "," + ys
             + " " + xsc + "," + (ys + ydelta)
             + " " + xm + "," + (ym + ydelta)
             + "S" + xtc + "," + yt
             + " " + xt + "," + yt;

      }
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      // Links that have this node as source.
      node.sourceLinks = [];
      // Links that have this node as target.
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      var source = link.source,
          target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    var remainingNodes = nodes,
        nextNodes,
        x = 0;

    // Work from left to right.
    // Keep updating the breath (x-position) of nodes that are target of recently updated nodes.
    while (remainingNodes.length && x < nodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0 && !link.cycleBreaker) {
            nextNodes.push(link.target);
          }
        });
      });
      if (nextNodes.length == remainingNodes.length) {
        // There must be a cycle here. Let's search for a link that breaks it.
        findAndMarkCycleBreaker(nextNodes);
        // Start over.
        // TODO: make this optional?
        return computeNodeBreadths();
      }
      else {
        remainingNodes = nextNodes;
        ++x;
      }
    }

    // Optionally move pure sinks always to the right.
    if (sinksRight) {
      moveSinksRight(x);
    }

    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  // Find a link that breaks a cycle in the graph (if any).
  function findAndMarkCycleBreaker(nodes) {
  // Go through all nodes from the given subset and traverse links searching for cycles.
    var link;
    for (var n=nodes.length - 1; n >= 0; n--) {
      link = depthFirstCycleSearch(nodes[n], []);
      if (link) {
        return link;
      }
    }

    // Depth-first search to find a link that is part of a cycle.
    function depthFirstCycleSearch(cursorNode, path) {
      var target, link;
      for (var n = cursorNode.sourceLinks.length - 1; n >= 0; n--) {
        link = cursorNode.sourceLinks[n];
        if (link.cycleBreaker) {
          // Skip already known cycle breakers.
          continue;
        }

        // Check if target of link makes a cycle in current path.
        target = link.target;
        for (var l = 0; l < path.length; l++) {
          if (path[l].source == target) {
            // We found a cycle. Search for weakest link in cycle
            var weakest = link;
            for (; l < path.length; l++) {
              if (path[l].value < weakest.value) {
                weakest = path[l];
              }
            }
            // Mark weakest link as (known) cycle breaker and abort search.
            weakest.cycleBreaker = true;
            return weakest;
          }
        }

        // Recurse deeper.
        path.push(link);
        link = depthFirstCycleSearch(target, path);
        path.pop();
        // Stop further search if we found a cycle breaker.
        if (link) {
          return link;
        }
      }
    }
  }


  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  // Compute the depth (y-position) for each node.
  function computeNodeDepths(iterations) {
    // Group nodes by breath.
    var nodesByBreadth = d3.nest()
        .key(function(d) { return d.x; })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeDepth();
    resolveCollisions();
    computeLinkDepths();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      computeLinkDepths();
      relaxLeftToRight(alpha);
      resolveCollisions();
      computeLinkDepths();
    }

    function initializeNodeDepth() {
      // Calculate vertical scaling factor.
      var ky = d3.min(nodesByBreadth, function(nodes) {
        return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
      });

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });

      links.forEach(function(link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            // Value-weighted average of the y-position of source node centers linked to this node.
            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return (link.source.y + link.sy + link.dy / 2) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            // Value-weighted average of the y-positions of target nodes linked to this node.
            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return (link.target.y + link.ty + link.dy / 2) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  // Compute y-offset of the source endpoint (sy) and target endpoints (ty) of links,
  // relative to the source/target node's y-position.
  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function(node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  // Y-position of the middle of a node.
  function center(node) {
    return node.y + node.dy / 2;
  }

  // Value property accessor.
  function value(x) {
    return x.value;
  }

  return sankey;
};
