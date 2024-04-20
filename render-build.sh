#!/usr/bin/env bash
# exit on error
set -o errexit

mkdir -p /opt/render/project/puppeteer
npm install
chmod -R 755 /opt/render/project/puppeteer