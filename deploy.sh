#!/usr/bin/env bash

CWD="$(pwd)"

pip install atramhasis
pip install ./requirements-dev.txt
python setup.py compile_catalog
cd atramhasis_gent/static
bower install
cd admin
bower install
cd $CWD
alembic upgrade head
python setup.py develop
pserve development.ini
# DB_URL="sqlite:///atramhasis_gent.sqlite" pserve development.ini