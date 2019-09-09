import csv;
import json;


json_dict = [];
with open('CSV/invoices.csv', 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file);
    for line in csv_reader :
        dictionary = {
        "from": line['From Value'],
        "to": line['To Value'],
        "weight": 1
        }
        json_dict.append(dictionary);

    short_dict = [];
    for item in json_dict :
        inside_short_dict = False;
        for thing in short_dict :
            if (item["to"] == thing["to"] and item["from"] == thing["from"]
            and item["to"] != '' or item["from"] != '') :
                thing["weight"] += 1;
                inside_short_dict = True;
        if (not inside_short_dict) :
            short_dict.append({
            "from" : item["from"],
            "to" : item["to"],
            "weight" : 1
            });
    print (short_dict)
