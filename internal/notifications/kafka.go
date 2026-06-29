package notifications

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

// KafkaNotifier publishes email notifications to a Kafka topic.
type KafkaNotifier struct {
	producer *kafka.Producer
	topic    string
}

// NewKafkaNotifier creates a Kafka producer from config.
func NewKafkaNotifier(cfg Config) (*KafkaNotifier, error) {
	if err := cfg.ValidateForEnabled(); err != nil {
		return nil, err
	}
	clientID := cfg.ClientID
	if clientID == "" {
		host, _ := os.Hostname()
		if host == "" {
			host = "unknown"
		}
		clientID = fmt.Sprintf("sami-mcp-gateway-%s-%d", host, os.Getpid())
	}
	km := kafka.ConfigMap{
		"bootstrap.servers":   cfg.Bootstrap,
		"security.protocol":   cfg.SecurityProto,
		"sasl.mechanisms":     cfg.SASLMechanism,
		"sasl.username":       cfg.SASLUsername,
		"sasl.password":       cfg.SASLPassword,
		"client.id":           clientID,
		"session.timeout.ms":  cfg.SessionTimeoutMS,
	}
	p, err := kafka.NewProducer(&km)
	if err != nil {
		return nil, fmt.Errorf("kafka producer: %w", err)
	}
	n := &KafkaNotifier{producer: p, topic: cfg.Topic}
	go n.deliveryReports()
	return n, nil
}

func (n *KafkaNotifier) deliveryReports() {
	for e := range n.producer.Events() {
		if m, ok := e.(*kafka.Message); ok && m.TopicPartition.Error != nil {
			log.Printf("[notifications] kafka delivery failed topic=%s: %v", n.topic, m.TopicPartition.Error)
		}
	}
}

// Notify publishes a notification asynchronously.
func (n *KafkaNotifier) Notify(ctx context.Context, msg EmailNotification) {
	if n == nil || n.producer == nil {
		return
	}
	payload, err := msg.MarshalJSON()
	if err != nil {
		log.Printf("[notifications] marshal message: %v", err)
		return
	}
	key := ""
	if len(msg.To) > 0 {
		key = msg.To[0]
	}
	topic := n.topic
	_ = n.producer.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Key:            []byte(key),
		Value:          payload,
	}, nil)
}

// Close flushes and shuts down the producer.
func (n *KafkaNotifier) Close() {
	if n == nil || n.producer == nil {
		return
	}
	n.producer.Flush(15 * 1000)
	n.producer.Close()
}
