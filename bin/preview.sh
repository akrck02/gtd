#!/bin/sh
# Preview a folder of markdown documents (or an Obsidian vault) with papiro.
#
#   bin/preview.sh ~/notes/my-vault        # http://127.0.0.1:8000
#   bin/preview.sh ./docs 8080
#
# Obsidian vaults (folders with a .obsidian directory) are detected.
# Needs python3, and go on systems other than linux x86-64.
# Run it again after changing your documents.
set -e

docs=${1:?"usage: bin/preview.sh <documents folder> [port]"}
port=${2:-8000}
root=$(cd "$(dirname "$0")/.." && pwd)
docs=$(cd "$docs" && pwd)
site=$(mktemp -d "${TMPDIR:-/tmp}/papiro-preview.XXXXXX")

# the binaries in bin are built for linux x86-64, elsewhere build them with go
if [ "$(uname -s)-$(uname -m)" = "Linux-x86_64" ]; then
	esbuild="$root/bin/esbuild"
	indexer="$root/bin/papiro-indexer"
else
	command -v go >/dev/null || { echo "go is needed to build esbuild and papiro-indexer"; exit 1; }
	echo "Building esbuild and papiro-indexer with go..."
	GOBIN="$site/.bin" go install github.com/evanw/esbuild/cmd/esbuild@v0.25.8
	# straight from github: the module proxy can serve an older "latest" for a while
	GOBIN="$site/.bin" GOPROXY=direct go install github.com/akrck02/papiro-indexer@main
	esbuild="$site/.bin/esbuild"
	indexer="$site/.bin/papiro-indexer"
fi

# the web app, styles are served unminified
cp "$root/index.html" "$root/gtdf.config.json" "$site/"
mkdir -p "$site/styles"
cp -R "$root/styles/src" "$site/styles/"
mkdir -p "$site/resources"
cp -R "$root/resources/icons" "$site/resources/"
"$esbuild" "$root/src/start.ts" --bundle --tsconfig="$root/tsconfig.json" --outfile="$site/scripts/start.js" --log-level=warning

# the documents
obsidian=""
[ -d "$docs/.obsidian" ] && obsidian="-obsidian" && echo "Obsidian vault detected."
"$indexer" -path "$docs" -destination "$site/resources/wiki" $obsidian >/dev/null

echo "Papiro preview of $docs"
echo "→ http://127.0.0.1:$port   (Ctrl C to stop)"
cd "$site" && exec python3 -m http.server "$port" --bind 127.0.0.1 >/dev/null 2>&1
