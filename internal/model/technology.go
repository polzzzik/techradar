package model

import (
	"fmt"
	"time"
)

type (
	TechnologyCategory string
	TechnologyRing     string
	TechnologySection  string
	TechnologyStatus   string
)

const (
	AdoptRing  TechnologyRing = "adopt"
	TrialRing  TechnologyRing = "trial"
	AssessRing TechnologyRing = "assess"
	HoldRing   TechnologyRing = "hold"
)

var ringMap = map[string]TechnologyRing{
	"adopt":  AdoptRing,
	"trial":  TrialRing,
	"assess": AssessRing,
	"hold":   HoldRing,
}

func GetRing(name string) (TechnologyRing, error) {
	ring, ok := ringMap[name]
	if !ok {
		return "", fmt.Errorf("ring %s not found", name)
	}
	return ring, nil
}

const (
	LanguageSection           TechnologySection = "languages & frameworks"
	DataManagementSection     TechnologySection = "data management"
	TechniquesAndToolsSection TechnologySection = "techniques & tools"
	PlatformsSection          TechnologySection = "platform & infrastructure"
)

var sectionMap = map[string]TechnologySection{
	"languages & frameworks":    LanguageSection,
	"data management":           DataManagementSection,
	"techniques & tools":        TechniquesAndToolsSection,
	"platform & infrastructure": PlatformsSection,
}

func GetSection(name string) (TechnologySection, error) {
	res, ok := sectionMap[name]
	if !ok {
		return "", fmt.Errorf("section %s not found", name)
	}
	return res, nil
}

const (
	BackendCategory  TechnologyCategory = "backend"
	FrontendCategory TechnologyCategory = "frontend"
	IOSCategory      TechnologyCategory = "ios"
	AndroidCategory  TechnologyCategory = "android"
)

var categoryMap = map[string]TechnologyCategory{
	"backend":  BackendCategory,
	"frontend": FrontendCategory,
	"ios":      IOSCategory,
	"android":  AndroidCategory,
}

func GetCategory(name string) (TechnologyCategory, error) {
	res, ok := categoryMap[name]
	if !ok {
		return "", fmt.Errorf("category %s not found", name)
	}
	return res, nil
}

const (
	TechnologyStatusNew       TechnologyStatus = "new"
	TechnologyStatusNoChange  TechnologyStatus = "no change"
	TechnologyStatusMovedUp   TechnologyStatus = "moved up"
	TechnologyStatusMovedDown TechnologyStatus = "moved down"
)

var statusMap = map[string]TechnologyStatus{
	"new":        TechnologyStatusNew,
	"no change":  TechnologyStatusNoChange,
	"moved up":   TechnologyStatusMovedUp,
	"moved down": TechnologyStatusMovedDown,
}

func GetStatus(name string) (TechnologyStatus, error) {
	res, ok := statusMap[name]
	if !ok {
		return "", fmt.Errorf("status %s not found", name)
	}
	return res, nil
}

type Technology struct {
	ID          int                `db:"id"`
	Name        string             `db:"name"`
	Description *string            `db:"description"`
	Ring        TechnologyRing     `db:"ring"`
	Section     TechnologySection  `db:"section"`
	Status      TechnologyStatus   `db:"status"`
	Category    TechnologyCategory `db:"category"`
	CreatedAt   time.Time          `db:"created_at"`
	UpdatedAt   time.Time          `db:"updated_at"`
}
