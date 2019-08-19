function generateRandomData() {
  var dataObject = new Object();

  var numNodes = Math.floor(10 + 10 * Math.random());
  var numLinks = Math.floor(1.25 * numNodes + 10 * Math.random());

  // Generate nodes
  dataObject.nodes = d3.range(numNodes).map(function (x) {return {name: "Node-" + x};});

  // Generate links
  dataObject.links = d3.range(numLinks).map(function (x) {
  	var target = source = Math.floor(Math.random() * numNodes);
  	while (target== source) {
  		target = Math.floor(Math.random() * numNodes);
  	}
  	return {source: source, target: target, value: 20};
  });

  return dataObject;
}

var new_data = generateRandomData();
