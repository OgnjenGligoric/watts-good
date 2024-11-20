package influxdb

import (
    "context"
    "log"
    "os"
    "time"
    influxdb2 "github.com/influxdata/influxdb-client-go/v2"
    "github.com/influxdata/influxdb-client-go/v2/api/write"
)

type InfluxClient struct {
    client influxdb2.Client
    org    string
    bucket string
}

func NewInfluxClient() *InfluxClient {
    token := os.Getenv("INFLUXDB_TOKEN")
    url := "http://localhost:8086"
    client := influxdb2.NewClient(url, token)
    return &InfluxClient{
        client: client,
        org:    "ftn",
        bucket: "simulator",
    }
}

func (i *InfluxClient) WriteData(value int) {
    writeAPI := i.client.WriteAPIBlocking(i.org, i.bucket)
    tags := map[string]string{"tagname1": "tagvalue1"}
    fields := map[string]interface{}{"field1": value}
    point := write.NewPoint("measurement1", tags, fields, time.Now())

    if err := writeAPI.WritePoint(context.Background(), point); err != nil {
        log.Fatal(err)
    }
}
