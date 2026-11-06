package main

import (
	"context"
	"fmt"

	"midrive/launcher"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// ListApps returns the collective manifest apps.
func (a *App) ListApps() ([]launcher.AppEntry, error) {
	m, err := launcher.LoadManifest("", "apps")
	if err != nil {
		return nil, err
	}
	return m.Apps, nil
}

// Status returns status string for an app.
func (a *App) Status(app launcher.AppEntry) string {
	return launcher.Status(app)
}

// Install installs an app.
func (a *App) Install(app launcher.AppEntry) (launcher.InstalledApp, error) {
	return launcher.Install(app, "")
}

// Launch launches an app detached.
func (a *App) Launch(app launcher.AppEntry) error {
	return launcher.Launch(app)
}

// Greet is a sample method.
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s!", name)
}
