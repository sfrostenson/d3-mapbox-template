import sys
sys.path.append('/Users/sfrostenso/Development/lib')
import csvtools as c
import math


# function for finding the min/max & natural quantiles in our data.
def quantiles(l):
    all_indexes = sorted(l)
    # filter out the N/As or -99.0
    filtered = filter(lambda a: a != 'N/A', all_indexes)
    minimum = min(filtered)
    maximum = max(filtered)
    divisions = 5
    num_entries = len(l)
    division = int(math.ceil(num_entries / divisions))

    stops = list()
    for n in range(0, 5):
        stops.append(filtered[n * division])

    return minimum, maximum, stops


### STEP ONE: Read csv in as one list of lists of dictionaries.
### Next, clean data and build node.
data = c.read_as_dict('unemployment-no-headers.csv')

# next remove all PR and state level data, as we're only interested in mapping county data.
counties = list()

for row in data:
    if 'County' in row['Area_name'] or 'Parish' in row['Area_name'] or 'city' in row['Area_name'] or 'City' in row['Area_name'] or 'Borough' in row['Area_name'] or 'Census' in row['Area_name']:
        counties.append(row)
    else:
        continue

# build node
node = list()

for row in counties:
    att = dict()
    att['FIPS'] = row['FIPS_Code']
    att['c'] = row['Area_name']
    att['s'] = row['State']
    att['rate'] = row['Unemployment_rate_2013']
    node.append(att)


# STEP TWO: Calculate quantiles.
unemploy_rate = []

for row in node:
    rate = (row['rate'])
    unemploy_rate.append(rate)

print quantiles(unemploy_rate)


# STEP THREE: Write node to file.
headers = ['FIPS', 'c', 's', 'rate']

result = list()
for row in node:
    result_row = list()

    for key in headers:
        result_row.append(row[key])

    result.append(result_row)

headers = [headers]
result = headers + result

# write results to makefile directory
c.write(result, "/Users/sfrostenso/Development/sandbox/d3-mapbox-map-transition-us/make/unemployment.csv")
