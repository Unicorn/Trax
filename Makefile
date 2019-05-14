ifeq ("$(shell echo "int main(){}" | $(CXX) -fdiagnostics-color -x c - -o /dev/null 2>&1)", "")
	override CXXFLAGS += -fdiagnostics-color
else ifeq ("$(shell echo "int main(){}" | $(CXX) -fcolor-diagnostics -x c - -o /dev/null 2>&1)", "")
	override CXXFLAGS += -fcolor-diagnostics
endif

NORMAL=\033[0m
RED=\033[31;01m
GREEN=\033[32;01m
YELLOW=\033[33;01m
BLUE=\033[34;01m

define print
	@echo "$($(strip $(1)))--$(2)$(NORMAL)"
endef

install:
	$(call print, BLUE, Updating yarn)
	@yarn install
	$(call print, YELLOW, Make sure you are using node v9.8.0)
	$(call print, NORMAL, hint: brew update && brew upgrade node)
	@echo your version of node:
	@node -v
	@echo
	$(call print, YELLOW, Make sure you are using yarn v1.3.2)
	$(call print, NORMAL, hint: brew update && brew upgrade yarn)
	@echo your version of yarn:
	@yarn -v
	@echo

development:
	$(call print, BLUE, Starting React)
	@yarn dev

production:
	$(call print, GREEN, Building Front-end and Electron app)
	@rm -rf dist
	@rm -rf build
	@yarn release
