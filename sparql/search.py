# Original inspiration: https://towardsdatascience.com/where-do-mayors-come-from-querying-wikidata-with-python-and-sparql-91f3c0af22e2
# Requests: https://realpython.com/python-requests/
import requests
WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql'
def clean_request_output_json(data, keys):
    cleaned_output = []
    for item in data['results']['bindings']:
        # For list of dicts:
        # item_dict = {}
        # for key in keys:
        #   if key not in item_dict:
        #       item_dict[key] = item[key]['value']
        # cleaned_output.append(item_dict)
        # For list of values: Assumes unique input
        for key in keys:
            cleaned_output.append(item[key]['value'])
    return cleaned_output
# Return the list of relationships for the provided resourceID
# Heavily borrowed from: https://stackoverflow.com/questions/46383784/wikidata-get-all-properties-with-labels-and-values-of-an-item
def getResourceRelationships(resourceId):
    var_labels = ['wdLabel']
    query = """
        SELECT DISTINCT ?""" + var_labels[0] + """ WHERE {
          VALUES (?company) {(wd:""" + str(resourceId) + """)}
          ?company ?p ?statement .
          ?wd wikibase:claim ?p.
          OPTIONAL {
          ?statement ?pq ?pq_ .
          ?wdpq wikibase:qualifier ?pq .
          }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
        } ORDER BY ?wd ?statement ?ps_
    """
    r = requests.get(WIKIDATA_ENDPOINT, params = {'format': 'json', 'query': query})
    data = r.json()
    
    return clean_request_output_json(data, var_labels)
# Return the list of entities in relationshipId of resourceId
def getRelatedResources(resourceId, relationshipId):
    var_labels = ['rel_resources']
    query = """
        SELECT ?""" + var_labels[0] + """ WHERE {
            wd:""" + resourceId + """ wdt:""" + relationshipId + """ ?""" + var_labels[0] + """
        }
    """
    r = requests.get(WIKIDATA_ENDPOINT, params = {'format': 'json', 'query': query})
    data = r.json()
    return clean_request_output_json(data, var_labels)
# ResourceRelationships for "Pulp Fiction" 
res_rel = getResourceRelationships("Q104123")
print(res_rel)
# All 'cast members' for "Pulp Fiction"
rel_res = getRelatedResources("Q104123", "P161")
print(rel_res)
