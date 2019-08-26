FROM python:3.6

WORKDIR /app
RUN apt update && apt install sqlite3
COPY . .
ADD start.sh start.sh
RUN sed -i 's/\r$//' start.sh && chmod +x start.sh
RUN pip install atramhasis
RUN pip install -r requirements-dev.txt
RUN python setup.py compile_catalog
RUN alembic upgrade head

RUN python setup.py develop
EXPOSE 6543


COPY crontab /etc/crond.d/datadump-task
RUN chmod 0644 /etc/cron.d/datadump-task
RUN service cron start

CMD "$(pwd)/start.sh"