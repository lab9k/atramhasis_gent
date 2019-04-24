FROM python:3.6

WORKDIR /app
COPY . /app
RUN apt update && apt install sqlite3
RUN pip install atramhasis
RUN pip install -r requirements-dev.txt
RUN python setup.py compile_catalog

RUN alembic upgrade head
RUN python setup.py develop
EXPOSE 6543
CMD /app/run.sh