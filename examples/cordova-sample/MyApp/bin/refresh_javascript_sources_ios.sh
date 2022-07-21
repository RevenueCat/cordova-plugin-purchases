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

# run the transpiling step
cd $SCRIPT_DIRECTORY/../plugins/cordova-plugin-purchases
npm run build
