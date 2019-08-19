function convert_data (data) {
  let new_data = [];
  for (let i = 0; i < data.length; i++) {
    let something_happened = false;
    for (let j = 0; j < new_data.length; j++) {
        if (data[i]["to"] + data[i]["from"] == new_data[j]["to"] + new_data[j]["from"]) {
          new_data[j]["weight"] += 1;
          something_happened = true;
        }
    }
    if (!something_happened) {
      new_data.push(data[i]);
    }
  }
  return new_data;
}
