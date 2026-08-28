#!/bin/bash
# Environment detection
if [ "$(uname -p)" = "i386" ]; then
  echo "Running in i386 mode"
  eval "$(/usr/local/homebrew/bin/brew shellenv)"
  alias brew='/usr/local/homebrew/bin/brew'
  export PYENV_ROOT="$HOME/.pyenv"
  export PATH="$PYENV_ROOT/bin:$PATH"
  eval "$(pyenv init --path)"
else
  echo "Running in ARM mode"
  eval "$(/opt/homebrew/bin/brew shellenv)"
  alias brew='/opt/homebrew/bin/brew'
fi
# in case this script is run from another directory, cd into the directory of the script
SCRIPT_DIRECTORY="$(dirname "$(realpath "$0")")"

# Transpile in the repo rather than in the installed plugin: the app now gets a packed copy
# instead of a symlink, and that copy ships no tsconfig.json to build against.
cd "$SCRIPT_DIRECTORY/../../../.."
npm run build
