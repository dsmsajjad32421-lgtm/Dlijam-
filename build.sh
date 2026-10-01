#!/bin/bash
echo "Setting up Dli World..."
unzip -o neonworld-step1.zip -d ./extracted 2>/dev/null || true
if [ -d "./extracted/neonworld" ]; then
  cp -r ./extracted/neonworld/server ./server_new 2>/dev/null || true
  cp -r ./extracted/neonworld/client ./client_new 2>/dev/null || true
fi
echo "Done!"
