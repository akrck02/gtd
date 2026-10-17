#!/bin/sh
# Download the native TypeScript compiler (tsgo) into bin/, to check types.
# No node or npm: the package is fetched from the npm registry with curl.
#
#   bin/install-ts.sh
#   bin/tsgo -p .
set -e

root=$(cd "$(dirname "$0")/.." && pwd)

case "$(uname -s)-$(uname -m)" in
	Linux-x86_64) platform=linux-x64 ;;
	Linux-aarch64) platform=linux-arm64 ;;
	Darwin-arm64) platform=darwin-arm64 ;;
	Darwin-x86_64) platform=darwin-x64 ;;
	*) echo "unsupported system: $(uname -s) $(uname -m)"; exit 1 ;;
esac

package="@typescript/native-preview-$platform"
tarball=$(curl -fsSL "https://registry.npmjs.org/$package/latest" | sed -n 's/.*"tarball":"\([^"]*\)".*/\1/p')

rm -rf "$root/bin/.tsgo"
mkdir -p "$root/bin/.tsgo"
curl -fsSL "$tarball" | tar -xz -C "$root/bin/.tsgo"
ln -sf "$root/bin/.tsgo/package/lib/tsgo" "$root/bin/tsgo"

echo "tsgo $("$root/bin/tsgo" --version) installed in bin/"
