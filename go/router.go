package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

// NewRouter to create a new router instance
func NewRouter() *Router {
	return &Router{httprouter.New()}
}

// Router  struct
type Router struct {
	*httprouter.Router
}

// Get http method router handler
func (r *Router) Get(path string, handler http.Handler) {
	r.GET(path, routeHandler(handler))
}

// Post http method router handler
func (r *Router) Post(path string, handler http.Handler) {
	r.POST(path, routeHandler(handler))
}

// Put http method router handler
func (r *Router) Put(path string, handler http.Handler) {
	r.PUT(path, routeHandler(handler))
}

// Patch http method router handler
func (r *Router) Patch(path string, handler http.Handler) {
	r.PATCH(path, routeHandler(handler))
}

// Delete http method router handler
func (r *Router) Delete(path string, handler http.Handler) {
	r.DELETE(path, routeHandler(handler))
}

// Routes defined routes.
func Routes() (*Router, error) {
	router := NewRouter()

	// instance, err := mgoSession()
	// if err != nil {
	// 	logger.Println("cant connect to database")
	// 	// TODO: email panic
	// 	return nil, err
	// }
	// db := instance.session
	// ensureIndexes(db)

	base := []Adapter{
		logRequest(logger),
		// mongo(db),
	}

	common := []Adapter{
		logRequest(logger),
		// mongo(db),
		// authenticate(),
		// currentUser(),
	}

	// Static Handlers
	router.Get("/", chain(RootHandler, base...))
	router.Post("/", chain(RootHandler, common...))

	router.Post("/repo_create", chain(RepoCreateHandler, base...))
	router.Post("/repo_delete", chain(RepoDeleteHandler, common...))

	router.Post("/issue_create", chain(IssueCreateHandler, common...))

	// Handle 404
	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "page404.html")
	})

	return router, nil
}
