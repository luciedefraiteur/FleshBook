import json
from urllib import request

workflow_file = "/home/luciedefraiteur/FleshBook/fleshbook/experiment_comfyui/workflows/experimental/my workflow.json"

with open(workflow_file, 'r') as f:
    prompt = json.load(f)

def queue_prompt(prompt):
    p = {"prompt": prompt}
    data = json.dumps(p).encode('utf-8')
    req =  request.Request("http://127.0.0.1:8188/prompt", data=data)
    try:
        response = request.urlopen(req)
        print(f"Workflow queued successfully: {response.read().decode()}")
    except Exception as e:
        print(f"Error queuing workflow: {e}")

queue_prompt(prompt)
