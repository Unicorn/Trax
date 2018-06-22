package main

import (
	"encoding/json"
	"net/http"
)

func decodeBody(r *http.Request, v interface{}) error {
	defer r.Body.Close()
	return json.NewDecoder(r.Body).Decode(v)
}

func encodeBody(w http.ResponseWriter, r *http.Request, v interface{}) error {
	// logger.Println("Outgoing JSON Object: ", v)
	return json.NewEncoder(w).Encode(v)
}
