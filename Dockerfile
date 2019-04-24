FROM python:3.6

WORKDIR /app
RUN apt update && apt install sqlite3
COPY . /app
ADD start.sh start.sh
RUN sed -i 's/\r$//' start.sh && chmod +x start.sh
RUN pip install atramhasis
RUN pip install -r requirements-dev.txt
RUN python setup.py compile_catalog
RUN alembic upgrade head

RUN python setup.py develop
EXPOSE 6543

CMD ./start.sh