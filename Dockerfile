# Papiro as a container: it indexes the documents in /resources/uploads
# and serves the wiki on port 8000, indexing again when they change.

FROM golang:1.25-alpine AS build
RUN apk add --no-cache git
RUN go install github.com/evanw/esbuild/cmd/esbuild@v0.25.8 \
	&& GOPROXY=direct go install github.com/akrck02/papiro-indexer@main
WORKDIR /papiro
COPY . .
RUN esbuild src/start.ts --bundle --minify --tsconfig=tsconfig.json --outfile=scripts/start.js

FROM alpine:3.20
RUN apk add --no-cache busybox-extras
COPY --from=build /go/bin/papiro-indexer /usr/local/bin/papiro-indexer
COPY --from=build /papiro/index.html /papiro/gtdf.config.json /site/
COPY --from=build /papiro/scripts /site/scripts
COPY --from=build /papiro/styles/src /site/styles/src
COPY --from=build /papiro/resources/icons /site/resources/icons
COPY docker/httpd.conf /etc/httpd.conf
COPY docker/entrypoint.sh /entrypoint.sh
VOLUME /resources/uploads
EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
