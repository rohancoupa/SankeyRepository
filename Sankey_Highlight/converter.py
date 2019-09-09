import csv;
import json;

def contained (array, element) :
    return element in array;

with open('CSV/order.csv', 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file);
    orders = list(csv_reader);
    data = {
        "nodes": [
            {
            "name": "N/A"
            }
        ],
        "links": []
    };
    counted_array = ["N/A"];
    for line in orders :
        if (not contained(counted_array,line["Status"])) :
            data["nodes"].append({
                "name": line["Status"]
            })
            counted_array.append(line["Status"]);

    new_dict = {};
    index = 0;
    for item in data["nodes"] :
        new_dict[item["name"]] = index;
        index += 1;

    counted_id = [];
    id_process = {};


    for line in orders:
        if (line["Requisition ID"] not in counted_id) :
            id_process[line["Requisition ID"]] = ["N/A", line["Status"]]
            counted_id.append(line["Requisition ID"]);
        else :
            id_process[line["Requisition ID"]].append(line["Status"]);

    links = []
    for item in id_process :
        for i in range(len(id_process[item]) - 1) :
            links.append({
                "source": new_dict[id_process[item][i]],
                "target": new_dict[id_process[item][i+1]],
                "value": 1
            });


    final_links = [];
    for item in links :
        already_counted = False;
        for element in final_links :
            if (item["source"] == element["source"] and item["target"] == element["target"]) :
                already_counted = True;
                element["value"] += 1;
        if (not already_counted) :
            final_links.append(item);

    for item in final_links:
        if (item["source"] == item["target"]) :
            final_links.remove(item)
    data["links"] = final_links;

    print(data)
