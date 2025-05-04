package api

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

func SendJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	err := json.NewEncoder(w).Encode(payload)
	if err != nil {
		slog.Error("send json", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func SendError(w http.ResponseWriter, code int, msg string) {
	SendJSON(w, code, map[string]string{"error": msg})
}
