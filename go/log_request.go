package main

import (
	"log"
	"net/http"
)

func logRequest(logger *log.Logger) Adapter {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			logger.Println(r.Method, r.RequestURI)
			h.ServeHTTP(w, r)
		})
	}
}
