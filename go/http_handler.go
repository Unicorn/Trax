package main

import (
	"context"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func httpHandler(function http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		function(w, r)
	}
}

func handler(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// w.Header().Set("Content-Type", "application/json")
		f(w, r)
	}
}

// routeHandler to add params to the context. Used to properly parse routes.
// It will be used with httprouter
func routeHandler(h http.Handler) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		// TODO: Fix context with value type string
		ctx := context.WithValue(r.Context(), "Params", ps)
		h.ServeHTTP(w, r.WithContext(ctx))
	}
}
