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
      link.value = 100
      dataObject.links[i] = link;
    }
//==============================================================================
  return dataObject;
}

//=============================================================================
let data = [
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
  { to: 'draft', from: 'pending_approval', weight: 5 },
  { to: 'booking_hold', from: 'processing', weight: 2 }
];
//==============================================================================
console.log(loadData(data));
