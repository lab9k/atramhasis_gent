#!/usr/bin/env bash

CWD="$(pwd)"

# clone
git clone https://github.com/lab9k/atramhasis_gent.git

# venv
python3 -m venv ./venv
source ./venv/bin/activate

# requirements
pip install atramhasis
pip install -r ./requirements-dev.txt

# compile language files
python setup.py compile_catalog

# install frontend dependencies
cd atramhasis_gent/static
bower install
cd admin
bower install
npm install
# build admin panel frontend-app
npm run build
# back to start folder
cd ${CWD}

# migrate database for changes
# yum install python36-sqlalchemy.x86_64 needed
alembic upgrade head

# insert first conceptscheme (needed every time a new conceptscheme is created :( )
sqlite3 atramhasis_gent.sqlite "INSERT INTO conceptscheme VALUES (1, 'urn:x-atramhasis_gent:words')"

# build the python app
python setup.py develop

# run the app
# pserve development.ini
# command to run before downloading rdf/nightly: dump_rdf development.ini
