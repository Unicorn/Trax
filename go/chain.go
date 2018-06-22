package main

import "net/http"

// Adapter function to be used on middlewares
type Adapter func(http.Handler) http.Handler

func chain(f http.HandlerFunc, adapters ...Adapter) http.Handler {
	h := handler(f)
	for i := len(adapters) - 1; i >= 0; i-- {
		h = adapters[i](h).(http.HandlerFunc)
	}

	return h
}

func chainOld(handler http.Handler, adapters ...Adapter) http.Handler {

	for i := len(adapters) - 1; i >= 0; i-- {
		handler = adapters[i](handler)
	}

	return handler
}
