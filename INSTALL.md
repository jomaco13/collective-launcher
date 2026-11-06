# Guía de instalación — Collective Launcher

Collective Launcher es un gestor de aplicaciones del colectivo con interfaz gráfica (Wails). Permite listar, instalar, actualizar y lanzar apps (inicialmente **Vinculum**) desde GitHub Releases.

## Requisitos
- Linux (Fedora/Ubuntu/Debian) x86_64
- Go >= 1.22
- Node.js + npm (para compilar el frontend)
- Dependencias del sistema: `webkit2gtk4.1-devel`, `gtk3-devel` (solo para compilar)

## Opción 1: Usar el binario precompilado
```bash
install -m 0755 /mnt/Workspace/Linux/collective-launcher/build/bin/collective-launcher ~/.local/bin/collective-launcher
```

## Opción 2: Compilar desde fuente
```bash
cd /mnt/Workspace/Linux/collective-launcher

# Dependencias (Fedora)
# sudo dnf install -y webkit2gtk4.1-devel gtk3-devel

export PATH="$HOME/go/bin:$PATH"
export PKG_CONFIG_PATH=/tmp/opencode/pkgconfig:/usr/lib64/pkgconfig

wails build
```
El binario quedará en `build/bin/collective-launcher`.

## Instalación en el sistema
```bash
install -m 0755 build/bin/collective-launcher ~/.local/bin/collective-launcher

mkdir -p ~/.local/share/applications
cat > ~/.local/share/applications/collective-launcher.desktop <<'EOF'
[Desktop Entry]
Type=Application
Name=Collective Launcher
Comment=Gestor de apps del colectivo
Exec=collective-launcher
Terminal=false
Categories=Utility;PackageManager;
EOF

update-desktop-database ~/.local/share/applications 2>/dev/null || true
```

## Configuración del catálogo
Las apps se definen en `apps/*.json`. Ejemplo (`apps/vinculum.json`):
```json
{
  "id": "vinculum",
  "name": "Vinculum",
  "description": "Cliente de sincronización bidireccional de Google Drive",
  "binary": "vinculum",
  "service": "vinculum.service",
  "dashboard": "http://127.0.0.1:8080",
  "github_owner": "TU_USUARIO_GITHUB",
  "github_repo": "Vinculum_DriveGo",
  "asset_pattern": "linux"
}
```
- Si `github_owner`/`github_repo` están definidos, el launcher resuelve la última release de GitHub y descarga el asset para Linux/amd64.
- Las apps se instalan en `~/Applications/<id>/<version>/` (visible, estilo ArtCraft).
- Si no, usa las URLs estáticas de `downloads`.

## Ejecución
```bash
collective-launcher
```

## Desarrollo (hot reload)
```bash
wails dev
```
Frontend en Vite con recarga rápida; backend Go accesible desde el navegador en `http://localhost:34115`.

## Notas
- La contraseña sudo (si se necesita) se guarda localmente en `~/.config/collective/sudo.pass` (permisos 0600) y no sale de la PC.
- Para publicar una app, crea un release en su repo de GitHub con el binario y su SHA-256. El launcher lo detectará automáticamente.