FROM python:3.6

WORKDIR /app
COPY . /app
RUN pip install atramhasis
RUN pip install -r requirements-dev.txt
RUN python setup.py compile_catalog

RUN alembic upgrade head
RUN python setup.py develop
EXPOSE 6543
CMD pserve "$(pwd)/development.ini"