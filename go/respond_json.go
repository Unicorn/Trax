package main

import "net/http"

func respondJSON(w http.ResponseWriter, r *http.Request, status int, data interface{}) {
	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")

	if data != nil {
		encodeBody(w, r, data)
	}
}
