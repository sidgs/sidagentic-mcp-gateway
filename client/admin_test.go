package client

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestInitServer(t *testing.T) {
	t.Parallel()

	t.Run("successful initialization", func(t *testing.T) {
		expectedResponse := InitServerResponse{
			Status: "Server initialized successfully",
		}

		server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method != http.MethodPost {
				t.Errorf("Expected POST method, got %s", r.Method)
			}
			if r.URL.Path != "/init" {
				t.Errorf("Expected path /init, got %s", r.URL.Path)
			}

			contentType := r.Header.Get("Content-Type")
			if contentType != "application/json" {
				t.Errorf("Expected Content-Type application/json, got %s", contentType)
			}

			var requestBody struct {
				Mode string `json:"mode"`
			}
			if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
				t.Fatalf("Failed to decode request body: %v", err)
			}
			if requestBody.Mode != "production" {
				t.Errorf("Expected mode 'production' (for backward compatibility), got %s", requestBody.Mode)
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			_ = json.NewEncoder(w).Encode(expectedResponse)
		}))
		defer server.Close()

		client := NewClient(server.URL, "", &http.Client{})
		response, err := client.InitServer()
		if err != nil {
			t.Fatalf("Unexpected error: %v", err)
		}

		if response.Status != expectedResponse.Status {
			t.Errorf("Expected Status %s, got %s", expectedResponse.Status, response.Status)
		}
	})

	t.Run("server error response", func(t *testing.T) {
		server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusInternalServerError)
			_, _ = w.Write([]byte("Internal server error"))
		}))
		defer server.Close()

		client := NewClient(server.URL, "", &http.Client{})
		response, err := client.InitServer()

		if err == nil {
			t.Error("Expected error, got nil")
		}
		if response != nil {
			t.Error("Expected nil response on error")
		}

		expectedError := "request failed with status: 500, message: Internal server error"
		if !strings.Contains(err.Error(), expectedError) {
			t.Errorf("Expected error to contain %s, got %s", expectedError, err.Error())
		}
	})

	t.Run("network error", func(t *testing.T) {
		client := NewClient("http://invalid-url-that-does-not-exist", "", &http.Client{})
		response, err := client.InitServer()

		if err == nil {
			t.Error("Expected error, got nil")
		}
		if response != nil {
			t.Error("Expected nil response on error")
		}

		if !strings.Contains(err.Error(), "failed to send request") {
			t.Errorf("Expected error to contain 'failed to send request', got %s", err.Error())
		}
	})

	t.Run("invalid JSON response", func(t *testing.T) {
		server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			_, _ = w.Write([]byte("invalid json"))
		}))
		defer server.Close()

		client := NewClient(server.URL, "", &http.Client{})
		response, err := client.InitServer()

		if err == nil {
			t.Error("Expected error, got nil")
		}
		if response != nil {
			t.Error("Expected nil response on error")
		}

		if !strings.Contains(err.Error(), "failed to decode response") {
			t.Errorf("Expected error to contain 'failed to decode response', got %s", err.Error())
		}
	})

	t.Run("bad request response", func(t *testing.T) {
		server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusBadRequest)
			_, _ = w.Write([]byte("Bad request"))
		}))
		defer server.Close()

		client := NewClient(server.URL, "", &http.Client{})
		response, err := client.InitServer()

		if err == nil {
			t.Error("Expected error, got nil")
		}
		if response != nil {
			t.Error("Expected nil response on error")
		}

		expectedError := "request failed with status: 400, message: Bad request"
		if !strings.Contains(err.Error(), expectedError) {
			t.Errorf("Expected error to contain %s, got %s", expectedError, err.Error())
		}
	})
}

func TestInitServerWithoutAuthHeader(t *testing.T) {
	t.Parallel()

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader != "" {
			t.Errorf("Expected no Authorization header for init, got %s", authHeader)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(InitServerResponse{Status: "Server initialized successfully"})
	}))
	defer server.Close()

	client := NewClient(server.URL, "some-token", &http.Client{})
	response, err := client.InitServer()
	if err != nil {
		t.Fatalf("Unexpected error: %v", err)
	}

	if response.Status != "Server initialized successfully" {
		t.Errorf("Expected Status 'Server initialized successfully', got %s", response.Status)
	}
}
