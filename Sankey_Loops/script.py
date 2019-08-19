import csv;
import json;


json_dict = [];
with open('Invoices.csv', 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file);
    for line in csv_reader :
        dictionary = {
        "from": line['From Value'],
        "to": line['To Value'],
        "weight": 1
        }
        json_dict.append(dictionary);
    print(json.dumps(json_dict));
