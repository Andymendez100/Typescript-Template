from base64 import encode
import csv
import sys
import json
stateJson = open('assets/states.json')
states = json.load(stateJson)
file_path = sys.argv[1]
file_name = sys.argv[2]
user_name = sys.argv[3]
download_dir = f'assets/reports/{user_name}/downloads/{file_name}'


def validateCSVData(lines):
    corrected_data = [lines.fieldnames]

    for line in lines:
        testAbbr = line['abbr'].strip()
        testState = line['state'].strip()
        if len(testAbbr) != 2:
            if len(testState) == 2:
                corrected_data.append([testAbbr, states[testAbbr]])
            else:
                print('Error!', 'Unexpected Formatting')
        else:
            # Need to check that the abbr is correct
            if states[testState] == testAbbr:
                corrected_data.append([testState, testAbbr])
            else:
                corrected_data.append([testState, states[testState]])
    return corrected_data


with open(file_path, "r+", encoding='utf-8') as mycsvfile:
    lines = csv.DictReader(mycsvfile)
    csvData = validateCSVData(lines)


with open(download_dir, 'w', encoding='utf-8', newline="") as newcsvfile:
    print("No Errors")
    writer = csv.writer(newcsvfile)
    writer.writerows(csvData)
