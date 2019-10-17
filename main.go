package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type response struct {
	Success bool        `json:"success"`
	Error   string      `json:"error"`
	Data    interface{} `json:"data"`
}

const apiBase = "https://trax-server.herokuapp.com"

func githubAuth(c echo.Context) error {
	key := os.Getenv("GH_CLIENT_ID")
	secret := os.Getenv("GH_CLIENT_SECRET")
	code := c.QueryParam("code")

	if len(key) < 10 || len(secret) < 10 {
		return c.JSON(http.StatusNotImplemented, response{Success: false, Error: "Github Client ID or Secret are missing"})
	}

	config := &oauth2.Config{
		ClientID:     key,
		ClientSecret: secret,
		Endpoint: oauth2.Endpoint{
			TokenURL: "https://github.com/login/oauth/access_token",
		},
	}

	token, err := config.Exchange(oauth2.NoContext, code)

	if !token.Valid() {
		log.Println("Error", err)
		return c.JSON(http.StatusOK, response{Success: false, Error: fmt.Sprintf("Error fetching github token: %s", err)})
	}

	return c.JSON(http.StatusOK, response{Success: true, Data: token})
}

func googleAuth(c echo.Context) error {
	key := os.Getenv("GOOGLE_CLIENT_ID")
	secret := os.Getenv("GOOGLE_CLIENT_SECRET")
	code := c.QueryParam("code")
	randState := fmt.Sprintf("st%d", time.Now().UnixNano())

	if len(key) < 10 || len(secret) < 10 {
		return c.JSON(http.StatusNotImplemented, response{Success: false, Error: "Google Client ID or Secret are missing"})
	}

	config := &oauth2.Config{
		ClientID:     key,
		ClientSecret: secret,
		Endpoint:     google.Endpoint,
		Scopes:       []string{"https://www.googleapis.com/auth/spreadsheets"},
		RedirectURL:  apiBase + "/google/auth",
	}

	if len(code) < 5 {
		return c.Redirect(http.StatusTemporaryRedirect, config.AuthCodeURL(randState))
	}

	token, err := config.Exchange(oauth2.NoContext, code)

	if !token.Valid() {
		log.Println("Error", err)
		return c.JSON(http.StatusOK, response{Success: false, Error: fmt.Sprintf("Error fetching google token: %s", err)})
	}

	return c.JSON(http.StatusOK, response{Success: true, Data: token})
}

func main() {
	godotenv.Load()
	e := echo.New()
	e.Use(middleware.CORS())
	e.GET("/github/auth", githubAuth)
	e.GET("/google/auth", googleAuth)
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}
