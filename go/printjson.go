package main

import "encoding/json"

func printjson(data interface{}) string {
	out, err := json.MarshalIndent(data, "  ", " ")
	if err != nil {
		return "can't print json representation"
	}
	return string(out)
}
