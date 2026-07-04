import urllib.request
import urllib.error
import json
import os
import sys

API_KEY = "bB1Q_XD8FpzUkpmw09tA"
BASE_URL = "https://the-one-api.dev/v2"
DIR = os.path.dirname(os.path.abspath(__file__))

def fetch_data(endpoint, requires_auth=True):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url)
    if requires_auth:
        req.add_header("Authorization", f"Bearer {API_KEY}")
    
    try:
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode('utf-8'))
        return data
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason} for {url}")
        sys.exit(1)
    except Exception as e:
        print(f"Error for {url}: {e}")
        sys.exit(1)

print("Fetching books...")
books_data = fetch_data("/book", requires_auth=False)
with open(os.path.join(DIR, "books.json"), "w", encoding="utf-8") as f:
    json.dump(books_data.get("docs", []), f, indent=2)

print("Fetching movies...")
movies_data = fetch_data("/movie")
with open(os.path.join(DIR, "movies.json"), "w", encoding="utf-8") as f:
    json.dump(movies_data.get("docs", []), f, indent=2)

print("Fetching characters (this may take a moment)...")
# Characters are paginated but if we set a large limit, we can get them all.
# There are around 933 characters, so limit=2000 is safe.
characters_data = fetch_data("/character?limit=2000")
with open(os.path.join(DIR, "characters.json"), "w", encoding="utf-8") as f:
    json.dump(characters_data.get("docs", []), f, indent=2)

print("Scraping complete. Files saved: books.json, movies.json, characters.json")
