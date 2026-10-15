#!/bin/sh
# Inicia o D2L Quest em http://localhost:8800 e abre no navegador.
cd "$(dirname "$0")"
PORT=8800
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Servidor já está rodando na porta $PORT."
else
  echo "Iniciando servidor em http://localhost:$PORT (Ctrl+C para parar)..."
  (sleep 1; open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null) &
  exec python3 -m http.server $PORT
fi
open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null
