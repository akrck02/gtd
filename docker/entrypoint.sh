#!/bin/sh
# Index the documents, serve the wiki and index again when they change.
#   PAPIRO_TITLE           the wiki title (default: Papiro)
#   PAPIRO_WATCH_SECONDS   how often to look for changes (default: 5, 0 to never)
set -e

docs=/resources/uploads
site=/site
mkdir -p "$docs"

if [ -n "$PAPIRO_TITLE" ]; then
	# escaped for json, then for sed
	title=$(printf '%s' "$PAPIRO_TITLE" | sed 's/\\/\\\\/g; s/"/\\"/g' | sed 's/[\\&/]/\\&/g')
	sed -i "s/\"app_name\": *\"[^\"]*\"/\"app_name\": \"$title\"/" "$site/gtdf.config.json"
fi

index() {
	obsidian=""
	[ -d "$docs/.obsidian" ] && obsidian="-obsidian"
	rm -rf "$site/resources/wiki.new"
	papiro-indexer -path "$docs" -destination "$site/resources/wiki.new" $obsidian >/dev/null 2>&1
	rm -rf "$site/resources/wiki"
	mv "$site/resources/wiki.new" "$site/resources/wiki"
	echo "Indexed $docs"
}

state() {
	find "$docs" -type f -exec stat -c '%Y %s %n' {} + 2>/dev/null | sort | md5sum
}

last=$(state)
index
httpd -f -p 8000 -h "$site" -c /etc/httpd.conf &
echo "Papiro is running on port 8000"

seconds=${PAPIRO_WATCH_SECONDS:-5}
[ "$seconds" = "0" ] && wait

while sleep "$seconds"; do
	current=$(state)
	if [ "$current" != "$last" ]; then
		last=$current
		index
	fi
done
