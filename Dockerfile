FROM python:3.6

WORKDIR /app
COPY . /app
RUN pip install atramhasis
RUN pip install -r requirements-dev.txt
RUN python setup.py compile_catalog

RUN alembic upgrade head
RUN python setup.py develop
EXPOSE 6543
CMD bash -c "sqlite3 ./atramhasis_gent/atramhasis_gent.sqlite \"INSERT INTO conceptscheme SELECT 1, 'http://stad.gent/id/concepts/gent_words' WHERE NOT EXISTS(SELECT 1 FROM conceptscheme WHERE id = 1);\"; pserve development.ini"