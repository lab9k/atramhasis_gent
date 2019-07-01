# -*- coding: utf-8 -*-

import logging

from skosprovider_sqlalchemy.providers import SQLAlchemyProvider
from sqlalchemy import create_engine

from atramhasis_gent.uri.generators import UriPatternGenerator

log = logging.getLogger(__name__)


def includeme(config):
    skosregis = config.get_skos_registry()

    gentproviders = get_internal_providers(config)

    [skosregis.register_provider(x) for x in gentproviders]

    gentproviders = get_external_providers()

    [skosregis.register_provider(x) for x in gentproviders]


def get_internal_providers(config):
    print(config.get_settings()['sqlalchemy.url'])
    ret = []
    engine = create_engine(config.get_settings()['sqlalchemy.url'], echo=True)
    engine.connect()
    result = engine.execute('SELECT * FROM conceptscheme')
    for row in result:
        scheme_db_id = row[0]
        scheme_uri = row[1]
        scheme_id = scheme_uri.split('/')[-1]
        print(f'id: {scheme_db_id}, uri: {scheme_uri}, scheme_id: {scheme_id}')
        scheme = SQLAlchemyProvider(
            {
                'id': scheme_id,
                'conceptscheme_id': scheme_db_id
            },
            config.registry.dbmaker,
            uri_generator=UriPatternGenerator(f'{scheme_uri}/%s')
        )
        ret.append(scheme)
    engine.dispose()
    return ret


def get_external_providers():
    # aat = AATProvider({'id': 'AAT', 'subject': ['external']})
    return []
