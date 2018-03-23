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

development:
	$(call print, GREEN, Starting development environment)
	#@osascript scripts/itermTab.scpt
	yarn dev

release:
	$(call print, GREEN, Bumping version and committing results for tagging and push)
	@./scripts/version minor
