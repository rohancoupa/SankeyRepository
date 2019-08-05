Plotly.d3.json('sankey_data.json', function(fig){

var data = {
  type: "sankey",
  domain: {
    x: [0,1],
    y: [0,1]
  },
  orientation: "h",
  valueformat: ".0f",
  valuesuffix: "TWh",
  node: {
    pad: 15,
    thickness: 15,
    line: {
      color: "black",
      width: 0.5
    },
   label: fig.data[0].node.label,
   color: fig.data[0].node.color
      },
  link: {
    source: fig.data[0].link.source,
    target: fig.data[0].link.target,
    value: fig.data[0].link.value,
    label: fig.data[0].link.label
  }
}

var data = [data]

var layout = {
  title: "Energy forecast for 2050<br>Source: Department of Energy & Climate Change, Tom Counsell via <a href='https://bost.ocks.org/mike/sankey/'>Mike Bostock</a>",
  width: 1118,
  height: 772,
  font: {
    size: 10
  }
}

Plotly.plot('plotly-div', data, layout, {showSendToCloud:true})
});
