FROM golang:1.24

WORKDIR /app

RUN apt-get update && apt-get install -y cron && apt-get clean

COPY go.mod go.mod
RUN go mod download && go mod verify

COPY ./ ./
RUN go build -o cron_create_pool_items ./cmd/crons/create_pool_items && \
    go build -o techradar ./cmd/techradar/

COPY crontab.txt /etc/cron.d/app-cron
RUN chmod 0644 /etc/cron.d/app-cron && crontab /etc/cron.d/app-cron

RUN touch /var/log/cron.log

EXPOSE 8080

CMD ["sh", "-c", "cron -f & ./techradar"]
