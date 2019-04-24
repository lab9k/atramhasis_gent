#!/usr/bin/env bash

sqlite3 atramhasis_gent.sqlite "INSERT INTO conceptscheme SELECT 1, 'http://stad.gent/id/concepts/gent_words' WHERE NOT EXISTS(SELECT 1 FROM conceptscheme WHERE id = 1);"
pserve development.ini