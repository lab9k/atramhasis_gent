#!/usr/bin/env bash

LAST_ID=$(sqlite3 atramhasis_gent.sqlite "SELECT id from conceptscheme ORDER BY id ASC;" | tail -n 1)
NEW_ID="$(($LAST_ID + 1))"
sqlite3 atramhasis_gent.sqlite "INSERT INTO conceptscheme VALUES ($NEW_ID, 'urn:x-atramhasis_gent:words')"