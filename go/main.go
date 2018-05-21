package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/securecookie"
	"github.com/joho/godotenv"
)

/**
 * Global logger
 */
var logger *log.Logger

func init() {
	logger = log.New(os.Stdout, "", log.Lshortfile|log.LstdFlags)
}

func main() {
	err := godotenv.Load()

	if err != nil {
		logger.Println("error loading .env file")
		return
	}

	r, err := Routes()

	if err != nil {
		logger.Println("Error starting App:", err)
		return
	}

	port := os.Getenv("PORT")
	logger.Println("listening on port ", port)

	http.ListenAndServe(":"+port, r)
}

//Gorilla Secure Cookie
var cookieHandler = securecookie.New(
	securecookie.GenerateRandomKey(64),
	securecookie.GenerateRandomKey(32),
)
