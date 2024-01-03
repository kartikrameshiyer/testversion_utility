from flask import Flask, jsonify,request
from flask_cors import CORS


import requests

app = Flask(__name__)
CORS(app)

def get_github_repos(username, token):
    api_url = f"https://api.github.com/users/{username}/repos"
    headers = {"Authorization": f"{token}"}

    try:
        response = requests.get(api_url, headers=headers)

        if response.status_code == 200:
            repos = response.json()
            return repos
        else:
            print("Error:", response.status_code, response.text)
            return None

    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return None

def get_branches(repo_url):
    branches_url = f"{repo_url}/branches?per_page=100"

    try:
        response = requests.get(branches_url)

        if response.status_code == 200:
            branches = response.json()
            return branches
        else:
            print("Error:", response.status_code, response.text)
            return None

    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return None

@app.route("/")
def index():
    username = request.args.get("username")
    token = request.args.get("token")
    #token = "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"
    if not username or not token:
        return jsonify({"error": "Username and token are required parameters"})
    repos = get_github_repos(username, token)
    
    if repos:
        repo_info = []
        for repo in repos:
            repo_data = {
                "Name": repo["name"],
                "Description": repo["description"],
                "URL": repo["html_url"]
            }
            repo_url = repo["html_url"]
            branches = get_branches(repo_url)
            if branches:
                repo_data["Branches"] = branches
            repo_info.append(repo_data)
        return jsonify({"repositories": repo_info})
    else:
        return jsonify({"error": "Failed to retrieve repositories"})

if __name__ == "__main__":
    app.run(debug=True)