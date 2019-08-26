import csv;
import json;

with open('CSV/order.csv', 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file);
    req_id = {};
    for line in csv_reader :
        if (line["Requisition ID"] in req_id.keys()) :
            req_id[line["Requisition ID"]].append(line["Status"]);
        else :
            req_id[line["Requisition ID"]] = ["N/A"];
            req_id[line["Requisition ID"]].append(line["Status"]);
    return_dict = [];
    for key in req_id.keys() :
        for i in range(len(req_id[key]) - 1):
            json_dict = {
            "from": req_id[key][i],
            "to": req_id[key][i+1],
            "weight": 1
            }
            return_dict.append(json_dict);
    new_data = [];
    for element in return_dict :
        already_inside = False;
        for thing in new_data :
            if (element["from"] == thing["from"] and element["to"] == thing["to"]) :
                thing["weight"] += 1;
                already_inside = True;
        if (not already_inside) :
            new_dict = {
                "from": element["from"],
                "to": element["to"],
                "weight": 1
            }
            new_data.append(new_dict);

    final_dict = []
    for i in range(len(new_data) - 1) :
        not_same_destination = new_data[i]["from"] != new_data[i]["to"];
        all_filled_in = new_data[i]["from"] != '' and new_data[i]['to'] != '';
        if (not_same_destination and all_filled_in) :
            final_dict.append(new_data[i]);
    print (final_dict);
