import json
import subprocess
import urllib.error
import urllib.request

def git_credential():
    result = subprocess.run(
        ["git", "credential", "fill"],
        input="protocol=https\nhost=github.com\n\n",
        capture_output=True,
        text=True,
        check=True,
    )
    data = {}
    for line in result.stdout.splitlines():
        if "=" in line:
            key, value = line.split("=", 1)
            data[key] = value
    return data.get("username"), data.get("password")


def api(method, url, token, payload=None):
    body = None if payload is None else json.dumps(payload).encode()
    req = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "smm-sfera-setup",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req) as response:
            raw = response.read().decode()
            return response.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as error:
        raw = error.read().decode()
        try:
            parsed = json.loads(raw)
        except json.JSONDecodeError:
            parsed = {"message": raw}
        return error.code, parsed


username, token = git_credential()
if not token:
    raise SystemExit("GitHub token not found")

status, me = api("GET", "https://api.github.com/user", token)
print("auth_user", me.get("login"), "status", status)

status, created = api(
    "POST",
    "https://api.github.com/user/repos",
    token,
    {
        "name": "smm-sfera",
        "description": "СММ СФЕРА — сайт агентства (версия Димы)",
        "private": False,
        "auto_init": False,
        "has_issues": True,
        "has_projects": False,
        "has_wiki": False,
    },
)
print("create_status", status)
print(json.dumps({k: created.get(k) for k in ("full_name", "html_url", "clone_url", "message", "errors")}, ensure_ascii=False, indent=2))
